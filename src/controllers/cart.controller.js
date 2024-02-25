const cartService = require("../services/cart.service")

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Cart item details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartReq'
 *     responses:
 *       '200':
 *         description: Product added to the cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItemDetail'
 *       '401':
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '409':
 *         description: Conflict - Product already in the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 * /cart:
 *   put:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Cart item details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartReq'
 *     responses:
 *       '200':
 *         description: Product removed from the cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItemDetail'
 *       '401':
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: NotFound - Product not in the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 * /cart:
 *   delete:
 *     summary: Empty the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Cart emptied successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const emptyCart = async(req,res,next) => {
    try {
        const result = await cartService.emptyCart(req.auth);
        return await res.status(200).json({status: "success"});
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get cart items for the authenticated user
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Cart items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItemDetail'
 *       '401':
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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