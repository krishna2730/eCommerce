const db = require('../clients/db');
const categoryService = require('../services/category.service');

//Add Parent Category
/**
 * @swagger
 * /:
 *   post:
 *     summary: Add Category
 *     tags:
 *       - category
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupCallbackDto'
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
const addParentCategory = async(req,res,next) => {
    try {
        const result = await categoryService.addParentCategory(req.body);
        return await res.status(200).json({status: "success",data: result});
    } catch (error) {
        next(error)
    }
}

//Add Sub Category
//Add Parent Category
/**
 * @swagger
 * /sub-category:
 *   post:
 *     summary: Add Sub Category Category
 *     tags:
 *       - category
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupCallbackDto'
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
const addSubCategory = async(req,res,next) => {
    try {
        const result = await categoryService.addSubCategory(req.body);
        return await res.status(200).json({status: "success",data: result});
    } catch (error) {
        next(error)
    }
}

//Get All Categories
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get All categories
 *     tags:
 *       - category
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupCallbackDto'
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
const getAllCategories = async(req,res,next) => {
    try {
        const result = await categoryService.getAllCategories();
        // console.log("Data:", result);
        return await res.status(200).json({status: "success",data: {length: result?.length,categories: result}});
    } catch (error) {
        next(error)
    }
}


//get Category by name
/**
 * @swagger
 * /sub-category:
 *   post:
 *     summary: Get Category by name
 *     tags:
 *       - category
 *     parameters:
 *       - name: name
 *         in: path
 *         description: Category search name
 *         required: true
 *         schema:
 *           type: string
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
const getCategoryByName = async(req,res,next) => {
    try {
        const result = await categoryService.getCategoryByName(req.params);
        return await res.status(200).json({status: "success",data: result});
    } catch (error) {
        next(error)
    }
}

const categoryController = {
    getAllCategories,
    getCategoryByName,
    addParentCategory,
    addSubCategory
};

module.exports = categoryController;