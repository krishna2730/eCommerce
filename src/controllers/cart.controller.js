const cartService = require("../services/cart.service")

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add to cart
 *     description: Add product items to cart
 *     tags:
 *       - cart
 *     responses:
 *       200:
 *         description: status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                    $ref: '#/components/schemas/UserDto'
 */
const addToCart = async(req,res,next) => {
    try {
        const result = await cartService.addToCart(req.body,req.auth);
        return await res.status(200).json({status: "success",data: {length: result?.length, cart: result}});
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /:
 *   put:
 *     summary: Remove from cart
 *     description: Remove product items to cart
 *     tags:
 *       - cart
 *     responses:
 *       200:
 *         description: status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                    $ref: '#/components/schemas/UserDto'
 */
const removeFromCart = async(req,res,next) => {
    try {
        const result = await cartService.removeFromCart(req.body,req.auth);
        return await res.status(200).json({status: "success",data: {length: result?.length, cart: result}});
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Empty Cart
 *     description: Remove product items to cart
 *     tags:
 *       - cart
 *     responses:
 *       200:
 *         description: status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                    $ref: '#/components/schemas/UserDto'
 */
const emptyCart = async(req,res,next) => {
    try {
        const result = await cartService.emptyCart(req.auth);
        return await res.status(200).json({status: "success",data: {length: result?.length, cart: result}});
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get Cart
 *     description: Get all the items in the cart
 *     tags:
 *       - cart
 *     responses:
 *       200:
 *         description: status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                    $ref: '#/components/schemas/UserDto'
 */
const getCartItems = async(req,res,next) => {
    try {
        // console.log(req.auth);
        const result = await cartService.getCartItems(req.auth);
        return await res.status(200).json({status: "success",data: {length: result?.length, cart: result}});
    } catch (error) {
        next(error)
    }
}

const cartController = {
    addToCart,
    removeFromCart,
    emptyCart,
    getCartItems
}

module.exports = cartController;