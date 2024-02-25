const db = require('../clients/db');
const cartRepository = require('../respos/cart.repo');

const addToCart = async(cartDetail, userId) => {
    const transaction = db.transaction();
    try {
        const result = await cartRepository.addToCart(cartDetail,userId);
        (await transaction).commit();
        return result;
    } catch (error) {
        (await transaction).rollback();
        throw error;
    }
}


const removeFromCart = async(cartDetail, userId) => {
    const transaction = db.transaction();
    try {
        const result = await cartRepository.removeFromCart(cartDetail,userId);
        (await transaction).commit();
        return result;
    } catch (error) {
        (await transaction).rollback();
        throw error;
    }
}



const emptyCart = async(userId) => {
    const transaction = db.transaction();
    try {
        const result = await cartRepository.emptyCart(userId);
        (await transaction).commit();
        return result;
    } catch (error) {
        (await transaction).rollback();
        throw error;
    }
}

const getCartItems = async(userId) => {
    const transaction = db.transaction();
    try {
        console.log('hello');
        const result = await cartRepository.getCartItems(userId)
        console.log('bye');
        (await transaction).commit();
        return result;
    } catch (error) {
        (await transaction).rollback();
        throw error;
    }
}

const cartService = {
    addToCart,
    removeFromCart,
    emptyCart,
    getCartItems
}

module.exports = cartService;