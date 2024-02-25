const db = require('../clients/db');
const orderRepository = require('../respos/orders.repo');

const placeOrder = async({cart_id},userId) => {
    const transaction = db.transaction();
    try {
        const result = await orderRepository.placeOrder(cart_id,userId);
        (await transaction).commit();
        return result;
    } catch (error) {
        (await transaction).rollback();
        throw error;
    }
}

const getOrderDetails = async(userId) => {
    const transaction = db.transaction();
    try {
        const result = await orderRepository.getOrderDetails(userId);
        (await transaction).commit();
        return result;
    } catch (error) {
        (await transaction).rollback();
        throw error;
    }
}

const getOrderDetailsById = async({order_id},userId) => {
    const transaction = db.transaction();
    try {
        const result = await orderRepository.getOrderDetailsById(order_id,userId);
        (await transaction).commit();
        return result;
    } catch (error) {
        (await transaction).rollback();
        throw error;
    }
}

const orderService = {
    placeOrder,
    getOrderDetails,
    getOrderDetailsById
}

module.exports = orderService;