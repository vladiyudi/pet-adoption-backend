const fs = require("fs").promises;
const path = require("path");
const bcrypt = require('bcrypt');
const pathUsersDb = path.resolve(__dirname, "../database/usersDb.json");

const userCol = require('../Schemas/mongooseSchemas')

// const newUser = new userCol ({userName:'Vasya', email:'vasya.com', password:'123', date:'12/34/45', id:'34343', lastName:'Petrov', phoneNumber:'55555', bio:'cool guy'})

const getMongoUserByEmail = async (email) => {
  try {
    const user = await userCol.findOne({ email });
    return user;
  }
  catch(err){
    console.log(err)
  }
}

const saveUser = async (user)=>{
    try{
      const newUser = new userCol(user)
        const saved = await newUser.save()
        console.log('saved', saved)
    return saved
    } catch (err){
        console.log(err)
    }    
}


const getAllUsers = async () => {
    try{
  const allUsers = await fs.readFile(pathUsersDb, "utf8");
  return JSON.parse(allUsers);}
  catch (err){
    console.log(err)
  }
}

const addUserToDB = async (user) => {
    try{
        const allUsers = await getAllUsers();
        allUsers.push(user);
        await fs.writeFile(pathUsersDb, JSON.stringify(allUsers));
        return true;
    } catch (err){
        console.log(err)
    }
}

async function getUserByEmail(email) {
    try {
      const allUsers = await getAllUsers();
      const user = allUsers.find((user) => user.email === email);
      return user
    } catch (err) {
      console.log(err);
    }
  }

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}


module.exports = {addUserToDB, getUserByEmail, getAllUsers, hashPassword, saveUser, getMongoUserByEmail};