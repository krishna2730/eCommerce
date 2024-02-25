const orderService = require("../services/orders.service");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */


/**
 * @swagger
 * /orders/{cart_id}:
 *   post:
 *     summary: Place a new order using the specified cart ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: cart_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '401':
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '409':
 *         description: Conflict - Order for the specified cart already placed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const placeOrder = async(req,res,next) => {
    try {
        const result = await orderService.placeOrder(req.params,req.auth);
        return await res.status(200).json({status: "success",data: {length: result.length, order: result}});
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderList'
 *       '401':
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const getOrderDetails = async(req,res,next) => {
    try {
        const result = await orderService.getOrderDetails(req.auth);
        return await res.status(200).json({status: "success",data: {length: result.length, order: result}});
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 * /orders/{order_id}:
 *   get:
 *     summary: Get details of a specific order by order ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Details of the specified order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '401':
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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