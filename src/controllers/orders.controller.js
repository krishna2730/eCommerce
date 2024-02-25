const orderService = require("../services/orders.service");

const placeOrder = async(req,res,next) => {
    try {
        const result = await orderService.placeOrder(req.params,req.auth);
        return await res.status(200).json({status: "success",data: {length: result.length, order: result}});
    } catch (error) {
        next(error);
    }
}

const getOrderDetails = async(req,res,next) => {
    try {
        const result = await orderService.getOrderDetails(req.auth);
        return await res.status(200).json({status: "success",data: {length: result.length, order: result}});
    } catch (error) {
        next(error);
    }
}

const getOrderDetailsById = async(req,res,next) => {
    try {
        const result = await orderService.getOrderDetailsById(req.params,req.auth);
        return await res.status(200).json({status: "success",data: {length: result.length, order: result}});
    } catch (error) {
        next(error);
    }
}

const orderController = {
    placeOrder,
    getOrderDetails,
    getOrderDetailsById
}

module.exports = orderController;