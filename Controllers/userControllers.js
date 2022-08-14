const { Console } = require("console");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');

const {addUserToDB, getUserByEmail, hashPassword} = require("../Models/usersModels");

const signup = async (req, res)=>{
try{
    const {userName, email, password1} = req.body
    const hasshedPassword = await hashPassword(password1)
    const user = {userName, email, password: hasshedPassword, date: new Date().toLocaleString(), id: uuidv4(), lastName:'', phoneNumber:'', bio:''}
    const addUser = addUserToDB(user)
    if (addUser) res.send(user) 
} catch (err){
    res.status(500).send('problem with signup')
}
}

const login = async (req, res)=>{
    try{
        const user = await getUserByEmail(req.body.email)
        if (user) res.send(user)
    } catch (err){
        res.status(500).send('problem with login')
    }
}

const updateUser = async (req, res)=>{
    try{ 
        const {id}=req.params
        console.log(id)

    } catch (err){
        res.status(500).send('problem with updateUser')
    }
}

module.exports = {login, signup, updateUser}