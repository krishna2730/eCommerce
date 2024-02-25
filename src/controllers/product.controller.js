const db = require('../clients/db');
const createHttpError = require('http-errors');
const productService = require('../services/product.service');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

//Get All Products
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductList'
 */
const getAllProducts = async(req,res,next) => {
    try {
        const result = await productService.getAllProducts(req.params);
        return await res.status(200).json({status: "success",data: {length: result.length, products: result}});
    } catch (error) {
        next(error)
    }
}

//Get Product By Id
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       '200':
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductRes'
 *       '404':
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

const getProductById = async(req,res,next) => {
    try {
        const result = await productService.getProductById(req.params);
        return await res.status(200).json({status: "success",data: {length: result.length, products: result}});
    } catch (error) {
        next(error)
    }
}

//Get Product By Id
/**
 * @swagger
 * /products/category/{name}:
 *   get:
 *     summary: Get products by category name
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Category name
 *     responses:
 *       '200':
 *         description: A list of products in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductList'
 *       '401':
 *         description: Invalid category name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const getProductByName = async(req,res,next) => {
    try {
        const result = await productService.getProductByName(req.params);
        return await res.status(200).json({status: "success",data: {length: result.length, products: result}});
    } catch (error) {
        next(error)
    }
}


/**
 * @swagger
 * /products/category/{name}:
 *   get:
 *     summary: Get products by category name
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Category name
 *     responses:
 *       '200':
 *         description: A list of products in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductList'
 *       '401':
 *         description: Invalid category name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const getProductByCategoryName = async(req,res,next) => {
    try {
        const result = await productService.getProductByCategoryId(req.params);
        return await res.status(200).json({status: "success",data: {length: result.length, products: result}});
    } catch (error) {
        next(error)
    }
}


//Add Product
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       description: Product data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductReq'
 *     responses:
 *       '200':
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductRes'
 *       '401':
 *         description: Invalid category name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

const addProduct = async(req,res,next) => {
    try {
        const result = await productService.addProduct(req.body);
        return await res.status(200).json({status: "success",data: result});
    } catch (error) {
        next(error)
    }
}

//Edit Product
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Edit a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       description: Updated product data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductReq'
 *     responses:
 *       '200':
 *         description: Product edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductRes'
 *       '404':
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const editProduct = async(req,res,next) => {
    try {
        const result = await productService.editProduct(req.body,req.params);
        return await res.status(200).json({status: "success",data: result});
    } catch (error) {
        next(error)
    }
}



const productController = {
    getAllProducts,
    getProductById,
    getProductByCategoryName,
    getProductByName,
    addProduct,
    editProduct
}

module.exports = productController;