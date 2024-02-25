const db = require('../clients/db');
const categoryRepository = require('../respos/category.repo');
const productRepository = require('../respos/product.repo');
const createHttpError = require('http-errors');

//Get All Products
const getAllProducts = async() => {
    try {
        const products = await productRepository.getAllProducts();
        console.log("Data:", products);
        return products;
    } catch (error) {
        throw error;
    }
}

//Get Product By Id
const getProductById = async(productData) => {
    const {id} = productData;
    try {
        const product = await productRepository.getProductById(id);
        console.log("Data:", product);
        return product;
    } catch (error) {
        throw error;
    }
}

//Get Product By Id
const getProductByName = async(productData) => {
    const {name} = productData;
    console.log(name);
    try {
        const products = await productRepository.getProductByName(name);
        console.log("Data:", products);
        return products;
    } catch (error) {
        throw error;
    }
}

//Get Products By category Name
const getProductByCategoryId = async(productData) => {
    const {name} = productData;
    try {
        const category = await categoryRepository.getCategoryByName(name);
        if(!category){
            throw createHttpError(401,"The category name doesn't exist. So please select the exisiting category")
        }
        const products = await productRepository.getProductByCategoryId(category.id);
        console.log("Data:", products);
        return products;
    } catch (error) {
        throw error;
    }
}


//Add Product
const addProduct = async(productData) => {
    const transaction = db.transaction();
    const {categoryName,...data} = productData;
    try {
        const category = await categoryRepository.getCategoryByName(categoryName);
        if(!category){
            throw createHttpError(401,"The category name doesn't exist. So please select the exisiting category")
        }
        
        const product = await productRepository.addProduct({... data, category_id: category.id});
        (await transaction).commit();
        return product;
    } catch (error) {
        (await transaction).rollback();
        throw error
    }
}

//Edit Product
const editProduct = async(productData, productId) => {
    const {id} = productId;
    const transaction = db.transaction();
    const {categoryName,...data} = productData;
    try {
        const category = await categoryRepository.getCategoryByName(categoryName);
        if(!category){
            throw createHttpError(401,"The category name doesn't exist. So please select the exisiting category")
        }
        
        const product = await productRepository.editProduct({... data, category_id: category.id}, id);
        (await transaction).commit();
        return product;
    } catch (error) {
        (await transaction).rollback();
        throw error
    }
}



const productService = {
    getAllProducts,
    getProductById,
    getProductByCategoryId,
    getProductByName,
    addProduct,
    editProduct
}

module.exports = productService;