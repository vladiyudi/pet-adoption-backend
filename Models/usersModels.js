const bcrypt = require('bcrypt');
const userCol = require('../Schemas/mongooseSchemas')

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
    return saved
    } catch (err){
        console.log(err)
    }    
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

module.exports = {hashPassword, saveUser, getMongoUserByEmail};