const userRepository = require("../respos/user.repo");
const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const db = require('../clients/db');
const jwt = require('jsonwebtoken')

const createUser = async(userData) => {
    const transaction = db.transaction();
    try {
        //Fetch Email
        const result = await userRepository.getByEmail(userData.email_address);
        if(result){
            throw createHttpError(409, " This email is already registered");
        }

        //Hash Password
        const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 is the number of salt rounds
        const user = await userRepository.create({
            name: userData.name,
            email_address: userData.email_address,
            password: hashedPassword,
            phone_number: userData.phone_number
        });
        (await transaction).commit();
        return user;
    } catch (error) {
        (await transaction).rollback();
        throw error;
    }
}

const editUser = async(userData, userId) => {
    try {
        const user = await userRepository.edit(userData, userId);
        return user;
    } catch (error) {
        throw error;
    }
}

const login = async(data) => {
    const transaction = db.transaction();
    try {
        //Find User By email
        const user = await userRepository.getByEmail(data.email_address);
        if(!user){
            throw createHttpError(401, "'Authentication failed: User not found.");
        }

        // Verify the password
        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if (!isValidPassword) {
            throw createHttpError(401, "'Authentication failed: Incorrect password.");
        }

        // Prepare JWT payload
        const payload = {
            userId: user.id,
        };

        // Sign JWT
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

        (await transaction).commit();
        return {token};
    } catch (error) {
        (await transaction).rollback();
        throw error;
    }
}

const userService = {
    createUser,
    editUser,
    login
};

module.exports =  userService;




