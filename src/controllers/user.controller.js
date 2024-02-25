const userService = require("../services/user.service");

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register User
 *     description: Get me info
 *     tags:
 *       - users
 *     requestBody:
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
const createUser = async(req,res,next) => {
    try {
        const result = await userService.createUser(req.body);
        return await res.status(200).json({status: "success",data: result});
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Edit User info
 *     description: Get me info
 *     tags:
 *       - users
 *     requestBody:
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
const editUser = async(req,res,next) => {
    try {
        const result = await userService.editUser(req.body,req.auth);
        return await res.status(200).json({status: "success",data: result});
    } catch (error) {
        next(error);
    }
}

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login User
 *     description: Log user into the system
 *     tags:
 *       - users
 *     requestBody:
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
const login = async(req,res,next) => {
    try {
        const result = await userService.login(req.body);
        return await res.status(200).json({status: "success",data: result});
    } catch (error) {
        next(error)
    }
}

const userController = {
    createUser,
    editUser,
    login
};

module.exports =  userController;




