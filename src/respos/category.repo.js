const db = require('../clients/db');

//Add Parent Category
const createParentCategory = async(name) => {
    const [result] = await db('product_category').insert({
        category_name: name
    }).returning('*');
    return result;
}

//Add Sub Category
const createSubCategory = async(name, parentNameId) => {
    const [result] = await db('product_category').insert({
        category_name: name,
        parent_category_id: parentNameId,
    }).returning('*');
    return result;
}

//Get All Categories
const getAllCategories = async() => {
    const result = await db.select('category_name').from('product_category');
    console.log(result);
    return result;
}

//get Category by name
const getCategoryByName = async(name) => {
    const [result] = await db.column('category_name').select('*').from('product_category').whereLike('category_name',`%${name}%`).limit(1);
    // console.log("result:", result);
    return result;
}

const categoryRepository = {
    getAllCategories,
    getCategoryByName,
    createParentCategory,
    createSubCategory
};

module.exports = categoryRepository;