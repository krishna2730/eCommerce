const db = require('../clients/db');
const categoryService = require('../services/category.service');

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

//Add Parent Category
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Add a parent category
 *     tags: [Category]
 *     requestBody:
 *       description: Category details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '200':
 *         description: Parent category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryDetail'
 *       '409':
 *         description: ConflictError - Category name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
/**
 * @swagger
 * /category/sub-category:
 *   post:
 *     summary: Add a sub-category
 *     tags: [Category]
 *     requestBody:
 *       description: Sub-category details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: Sub-category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryDetail'
 *       '409':
 *         description: ConflictError - Category name already exists or Parent category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       '200':
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryDetail'
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