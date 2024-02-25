const express = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth');
const categoryController = require('../controllers/category.controllers');
const productController = require('../controllers/product.controller');
const cartController = require('../controllers/cart.controller');
const orderController = require('../controllers/orders.controller');
const {validationResult } = require('express-validator');
const validationHadler = require('../middleware/validation');


const testRouter = () => {
    const router = express.Router();
    router.get('/',(req,res,next) => {
        // console.log('Hello From Triveous Team');
        res.status(200).send('Hello From Triveous Team')
    });
    router.get('/verify-token',verifyToken);
    return router;
}

const userRouter = () => {
    const router = express.Router();
    router.post('/',validationHadler.createUserValidation,validationHadler.validateInput,userController.createUser);
    //Authentication Required
    router.put('/',verifyToken,validationHadler.editUserValidation,validationHadler.validateInput,userController.editUser);
    router.post('/login',validationHadler.loginUserValidation,validationHadler.validateInput,userController.login);
    return router;
}

const categoryRouter = () => {
    const router = express.Router();
    router.get('/',categoryController.getAllCategories);
    router.get('/:name',categoryController.getCategoryByName);
    router.post('/',validationHadler.addParentCategoryValidation,validationHadler.validateInput,categoryController.addParentCategory);
    router.post('/sub-category',validationHadler.addSubCategoryValidation,validationHadler.validateInput,categoryController.addSubCategory);
    return router;
}

const productRouter = () => {
    const router = express.Router();
    router.get('/',productController.getAllProducts);
    router.get('/:id',productController.getProductById);
    router.post('/',validationHadler.addProductValidation,validationHadler.validateInput,productController.addProduct);
    router.put('/:id',validationHadler.editProductValidation,validationHadler.validateInput,productController.editProduct);
    return router;
}

const cartRouter = () => {
    const router = express.Router();
    router.get('/',cartController.getCartItems);
    router.post('/',cartController.addToCart);
    router.put('/',cartController.removeFromCart);
    router.delete('/',cartController.emptyCart);    
    return router;
}

const orderRouter = () => {
    const router = express.Router();
    router.get('/',orderController.getOrderDetails);
    router.get('/:order_id',orderController.getOrderDetailsById);
    router.post('/:cart_id',orderController.placeOrder);
    return router;
}

const useAPI = (app, basePath) => {
    app.use(basePath+ "/",testRouter());
    app.use(basePath+ "/users",userRouter());
    app.use(basePath+ "/category",categoryRouter());
    app.use(basePath+"/products",productRouter());

    //Authenticate users to use cart and orders
    app.use(basePath+ "/cart",verifyToken,cartRouter());
    app.use(basePath+ "/orders",verifyToken,orderRouter());
}

module.exports = useAPI