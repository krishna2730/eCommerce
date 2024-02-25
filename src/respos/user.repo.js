const db = require('../clients/db');

const create = async(userData) => {
    // const {email, password} = userData;
    const [result] = await db("users").insert(userData).returning('*');
    return result;
}

const edit = async(userData,userId) => {
    const result = await db("users").update(userData).where('id',userId).returning('*');
    return result;
}

const getById = async(id) => {
    const [result] = await db.select("*").from('users').where('id',id).limit(1);
    return result;
}

const getByEmail = async(email) => {
    const [result] = await db.select("*").from('users').where('email_address',email).limit(1);
    return result;
}

const getAllUsers = () => {

}

const userRepository = {
    create,getById, getByEmail, getAllUsers, edit
};

module.exports = userRepository;