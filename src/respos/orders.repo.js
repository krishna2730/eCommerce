const db = require('../clients/db');
const createHttpError = require('http-errors');
const cartRepository = require('./cart.repo');

const placeOrder = async(cart_id,userId) => {
    console.log(cart_id,userId);
    let [cart] = await db.select('*').from('shopping_cart').where('user_id',userId).andWhere('id',cart_id).limit(1);
    if(!cart){
        throw createHttpError(401,'Carty is Empty');
    }
    const [checkOrderStatus] = await db.select('*').from('shop_order').where('user_id',userId).andWhere('cart_id',cart_id).limit(1);
    if(checkOrderStatus){
        throw createHttpError(409,'Order has been placed already!');
    }

    //Get order Total
    const cartData = await cartRepository.getCartItems(userId);
    const order_total = cartData.reduce((total, num) => {
        // console.log(num.total_product_price);
        return total + num.total_product_price;
    }, 0);

    // change status of the cart to order
    await db('shopping_cart').update('status','ordered').where('id',cart_id);

    //Add to orders Table
    const result = await db('shop_order').insert({
        user_id: userId,
        cart_id: cart_id,
        order_date: new Date().toISOString(),
        order_total: order_total
    }).returning('*')

    console.log(result);
    return result;
}

const getOrderDetails = async(userId) => {
    const result = await db.select('*').from('shop_order').where('user_id',userId);
    return result;
}

const getOrderDetailsById = async(orderId,userId) => {
    const result = await db.select('*').from('shop_order').where('user_id',userId).andWhere('id',orderId);
    return result;
}

const orderRepository = {
    placeOrder,
    getOrderDetails,
    getOrderDetailsById
};

module.exports = orderRepository;