const db = require('../clients/db');
const createHttpError = require('http-errors');
const productService = require('../services/product.service');

//Get All Products
const getAllProducts = async(req,res,next) => {
    try {
        const result = await productService.getAllProducts(req.params);
        return await res.status(200).json({status: "success",data: {length: result.length, products: result}});
    } catch (error) {
        next(error)
    }
}

//Get Product By Id
const getProductById = async(req,res,next) => {
    try {
        const result = await productService.getProductById(req.params);
        return await res.status(200).json({status: "success",data: {length: result.length, products: result}});
    } catch (error) {
        next(error)
    }
}

//Get Product By Id
const getProductByName = async(req,res,next) => {
    console.log(req.params);
    try {
        const result = await productService.getProductByName(req.params);
        return await res.status(200).json({status: "success",data: {length: result.length, products: result}});
    } catch (error) {
        next(error)
    }
}

//Get Products By category Name
const getProductByCategoryName = async(req,res,next) => {
    try {
        const result = await productService.getProductByCategoryId(req.params);
        return await res.status(200).json({status: "success",data: {length: result.length, products: result}});
    } catch (error) {
        next(error)
    }
}


//Add Product
const addProduct = async(req,res,next) => {
    try {
        const result = await productService.addProduct(req.body);
        return await res.status(200).json({status: "success",data: result});
    } catch (error) {
        next(error)
    }
}

//Edit Product
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