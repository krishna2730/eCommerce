const { body, validationResult } = require('express-validator');

// Validation Middleware for Create User
const createUserValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email_address').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone_number').isMobilePhone().withMessage('Invalid phone number'),
];

// Validation Middleware for Edit User
const editUserValidation = [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('phone_number').optional().isMobilePhone().withMessage('Invalid phone number'),
];

// Validation Middleware for User Login
const loginUserValidation = [
    body('email_address').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];


// Validation Middleware for Add Product
const addProductValidation = [
    body('categoryName').notEmpty().withMessage('Category name is required'),
    body('name').notEmpty().withMessage('Product name is required'),
    body('description').notEmpty().withMessage('Product description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
];

// Validation Middleware for Edit Product
const editProductValidation = [
    body('categoryName').optional().notEmpty().withMessage('Category name is required'),
    body('name').optional().notEmpty().withMessage('Product name is required'),
    body('description').optional().notEmpty().withMessage('Product description is required'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
];

// Validation Middleware for Add Parent Category
const addParentCategoryValidation = [
    body('name').notEmpty().withMessage('Category name is required'),
];

// Validation Middleware for Add Sub Category
const addSubCategoryValidation = [
    body('name').notEmpty().withMessage('Category name is required'),
    body('parentName').notEmpty().withMessage('Parent category name is required'),
];


const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors.array());
    }
    next();
};

const validationHadler = {
    createUserValidation, 
    editUserValidation, 
    loginUserValidation, 
    addProductValidation, 
    editProductValidation, 
    addParentCategoryValidation, 
    addSubCategoryValidation,
    validateInput
}

module.exports = validationHadler;