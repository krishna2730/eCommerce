const db = require('../clients/db');
const categoryRepository = require('../respos/category.repo');
const createHttpError = require('http-errors');

//Add Parent Category
const addParentCategory = async(categoryData) => {
    const transaction = db.transaction();
    const {name} = categoryData;
    try {
        const result = await categoryRepository.getCategoryByName(name);
        if(result){
            throw createHttpError(409,'The category name already exists')
        }
        const category = await categoryRepository.createParentCategory(name);
        (await transaction).commit();
        return category;
    } catch (error) {
        (await transaction).rollback();
        throw error
    }
}

//Add Sub Category
const addSubCategory = async(categoryData) => {
    const transaction = db.transaction();
    const {name, parentName} = categoryData;
    try {
        const result = await categoryRepository.getCategoryByName(name);
        if(result){
            throw createHttpError(409,'The category name already exists')
        }
        const parentCategory = await categoryRepository.getCategoryByName(parentName);
        if(!parentCategory){
            throw createHttpError(401,"The Parent category name Doesn't exist. So please add the Parent category name First")
        }
        const category = await categoryRepository.createSubCategory(name, parentCategory.id);
        (await transaction).commit();
        return category;
    } catch (error) {
        (await transaction).rollback();
        throw error
    }
}

//Get All Categories
const getAllCategories = async() => {
    try {
        const result = await categoryRepository.getAllCategories();
        const categories = result.map((data) => {return data.category_name;})
        return categories;
    } catch (error) {
        throw error;
    }
}

//get Category by name
const getCategoryByName = async(categoryData) => {
    const {name} = categoryData;
    try {
        const result = await categoryRepository.getCategoryByName(name);
        const categories = result.map((data) => {return data.category_name;})
        return categories
    } catch (error) {
        throw error;
    }
}

const categoryService = {
    getAllCategories,
    getCategoryByName,
    addParentCategory,
    addSubCategory
};

module.exports = categoryService;