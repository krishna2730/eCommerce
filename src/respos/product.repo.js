const db = require('../clients/db');

//Get All Products
const getAllProducts = async(name) => {
    if(name){
        return await db.select('*').from('product').whereLike('name',`%${name}%`);
    }
    return await db.select('*').from('product');
}

//Get Product By Id
const getProductById = async(id) => {
    const [result] = await db.select('*').from('product').where('id',id).limit(1);
    return result;
}

//Get Product By Name
const getProductByName = async(name) => {
    const result = await db.select('*').from('product').whereLike('name',`%${name}%`);
    return result;
}

//Get Products By category Name
const getProductByCategoryId = async(categoryId) => {
    const result = await db.select('*').from('product').where('category_id',categoryId);
    return result;
}


//Add Product
const addProduct = async(productData) => {
    const [result] = await db("product").insert(productData).returning('*');
    return result;
}

//Edit Product
const editProduct = async(productData,productId) => {
    const [result] = await db("product").update(
        productData
   ).where('id',productId).returning('*');
   return result;
}



const productRepository = {
    getAllProducts,
    getProductById,
    getProductByCategoryId,
    getProductByName,
    addProduct,
    editProduct
}

module.exports = productRepository;