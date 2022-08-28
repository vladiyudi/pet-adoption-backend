const bcrypt = require('bcrypt');
const userCol = require('../Schemas/mongooseSchemas')
const newsCol = require('../Schemas/newsSchema')
const petCol = require('../Schemas/petSchema')

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

const updateNewsUser = async (user)=>{
  const {userName} = user
  const news = new newsCol({news: `new user ${userName} signed up`})
  news.save()
}

const updateNewsAdoptionStatus = async (user, petId, action)=>{
try{
  const {userName, lastName} = user
  const pet = await petCol.findById(petId)
  const news = new newsCol({news: `user ${userName} ${lastName?lastName:''} ${action} ${pet.type} ${pet.name}`})
  news.save()
}catch(err){
  console.log(err)
}
}

module.exports = {hashPassword, saveUser, getMongoUserByEmail, updateNewsUser, updateNewsAdoptionStatus};