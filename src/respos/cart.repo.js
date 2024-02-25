const db = require('../clients/db');
const createHttpError = require('http-errors');
const productRepository = require('./product.repo');

const createCart = async(userId) => {
    try {
        const result = await db('shopping_cart').insert({user_id: userId}).returning('*');
        return result;
    } catch (error) {
        throw error;
    }
}

const addToCart = async(cartDetail, userId) => {
    try {
        let [cart] = await db.select('*').from('shopping_cart').where('status','in_cart').andWhere('user_id',userId).returning('*').limit(1);
        if(!cart){
            [cart] = await createCart(userId);
        }
        console.log(cart);
        const [currentCartData] = await db.select('*').from('shopping_cart_item').where('product_id',cartDetail.product_id).andWhere('cart_id',cart.id).limit(1);
        console.log(currentCartData);
        const productData = await productRepository.getProductById(cartDetail.product_id);
        console.log(productData);
        if(productData){
            if(currentCartData){
                // updateCartData = {qty: currentCartData.qty + 1, ...cartDetail}
                await db('shopping_cart_item').update({
                    qty: currentCartData.qty + 1,
                    total_product_price: currentCartData.price * (currentCartData.qty + 1) ,
                }).where('product_id',cartDetail.product_id).andWhere('cart_id',cart.id).returning('*');;
            }else{
                await db('shopping_cart_item').insert({
                    product_id:cartDetail.product_id,
                    cart_id: cart.id,
                    qty:  1,
                    price: productData.price,
                    total_product_price: productData.price,
                }).andWhere('cart_id',cart.id).returning('*');
            }
        }else{
            throw createHttpError(401,'Product Not Found');
        }
        
        const result = await getCartItems(userId);
        return result;
    } catch (error) {
        throw error;
    }
}

const removeFromCart = async(cartDetail, userId) => {
    try {
        let [cart] = await db.select('*').from('shopping_cart').where('status','in_cart').andWhere('user_id',userId).returning('*').limit(1);
        console.log(cart);
        if(!cart){
            throw createHttpError(401,'Cart is already Empty');
        }
        const [currentCartData] = await db.select('*').from('shopping_cart_item').where('product_id',cartDetail.product_id).andWhere('cart_id',cart.id).limit(1);
        console.log(currentCartData);
        if(currentCartData){
            if(currentCartData.qty - 1 <= 0){
                await db('shopping_cart_item').delete().where('product_id',cartDetail.product_id).andWhere('cart_id',cart.id).returning('*');
            }else{
                await db('shopping_cart_item').update({
                    qty: currentCartData.qty - 1,
                    total_product_price: currentCartData.price * (currentCartData.qty - 1),
                }).where('product_id',cartDetail.product_id).andWhere('cart_id',cart.id).returning('*');
            }
        }else{
            throw createHttpError(401,'Product is already removed from the cart');
        }
        const result = await getCartItems(userId);
        return result;
    } catch (error) {
        throw error;
    }
}

const emptyCart = async(userId) => {
    try {
        let [cart] = await db.select('*').from('shopping_cart').where('status','in_cart').andWhere('user_id',userId).returning('*').limit(1);
        console.log(cart);
        if(!cart){
            throw createHttpError(401,'Cart is already Empty');
        }
        const result = await db.delete('*').from('shopping_cart_item').where('cart_id',cart.id);
        // const result = await db.delete('*').from('shopping_cart');
        return result;
    } catch (error) {
        throw error;
    }
}

const getCartItems = async(userId) => {
    try {
        let [cart] = await db.select('*').from('shopping_cart').where('status','in_cart').andWhere('user_id',userId).limit(1);
        if(!cart){
            [cart] = await createCart(userId);
        }
        const result = await db.select('*').from('shopping_cart_item').where('cart_id',cart.id);
        return result;
    } catch (error) {
        throw error;
    }
}

const cartRepository = {
    addToCart,
    removeFromCart,
    createCart,
    emptyCart,
    getCartItems
}

module.exports = cartRepository;