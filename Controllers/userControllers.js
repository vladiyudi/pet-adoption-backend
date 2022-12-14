const jwt = require('jsonwebtoken')
require('dotenv').config()

const {
  hashPassword,
  saveUser,
} = require("../Models/usersModels");
const { updateNewsUser, updateNewsAdoptionStatus } = require("../Models/usersModels");
const userCol = require("../Schemas/mongooseSchemas");
const { findById } = require('../Schemas/petSchema');


const signup = async (req, res) => {
  try {
    const { userName, email, password1 } = req.body;
    const hasshedPassword = await hashPassword(password1);
    const user = {
      userName,
      email,
      password: hasshedPassword,
      lastName: "",
      phoneNumber: "",
      bio: "",
      adoptedPets: [],
      fosteredPets: [],
      admin: false,
      profileImage: "",
    };
    const dbUser = await saveUser(user);
    updateNewsUser(dbUser)
    if (dbUser) res.send(dbUser);
  } catch (err) {
    res.status(500).send("problem with signup");
  }
};

const login = (req, res) => {
  try {
   const user = req.body 
    const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET, { expiresIn: "2d"})
    res.cookie('token', token, { maxAge: 15151252151251 })
    res.send({user, ok:true});
  } catch (err) {
    res.status(500).send("problem with login");
  }
};

const handleLogout=async (req, res) => {
  try{
    res.clearCookie('token');
    res.send({ok:true});
  }catch(err) {
    res.status(500).send("problem with handleLogout");
  }
}

const updateUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const { userName, email, lastName, bio, phoneNumber } = req.body;
    const user = await userCol.findById(_id);
    user.userName = userName;
    user.email = email;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.bio = bio;
    const updatedUser = await user.save();
    res.send(updatedUser);
  } catch (err) {
    res.status(500).send("problem with updateUser");
  }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userCol.find()
        .sort({'dateCreated': -1});
        res.send(users);
    } catch (err) {
        res.status(500).send("problem with getAllUsers");
    }
}

const addPetToFavorites = async (req, res) => {
try{
    const {petId} = req.body;
    const {userid} = req.body;
    const user = await userCol.findById(userid);
    user.interested = [...user.interested, petId];
    const updatedUser = await user.save();
    res.send(updatedUser);
} catch (err) {
    res.status(500).send("problem with addPetToFavorites");
}
}

const removePetFromFavorites = async (req, res) => {
    try{
        const {petId} = req.params;
        const {userid} = req.body
        const user = await userCol.findById(userid);
        user.interested = user.interested.filter(pet => pet!=petId)
        const updatedUser = await user.save();
        res.send(updatedUser);
    } catch (err) {
        res.status(500).send("problem with removePetFromFavorites");
    }
}

const addPetToAdopted = async (req, res) => {
try{
    const {petId} = req.body;
    const {userid} = req.body;
    const user = await userCol.findById(userid);
    user.adoptedPets = [...user.adoptedPets, petId];
    user.fosteredPets = user.fosteredPets.filter(pet => pet !== petId);
    const updatedUser = await user.save();
    updateNewsAdoptionStatus(updatedUser, petId, 'adopted')
    res.send(updatedUser);} 
    catch (err) {
    res.status(500).send("problem with addPetToAdopted");}
}

const removePetFromAdoped = async (req, res) => {
  try{
    const {petID} = req.params;
    const {userid} = req.body
    const user = await userCol.findById(userid);
    user.adoptedPets = user.adoptedPets.filter(pet => pet !== petID);
    user.fosteredPets=user.fosteredPets.filter(pet => pet !== petID)
    const updatedUser = await user.save();
    updateNewsAdoptionStatus(updatedUser, petID, 'returned')
res.send(updatedUser);  
  }catch(err) {
    res.status(500).send("problem with removePetFromAdoped");
  }
}

const addPetToFosteredUser = async (req, res) => {
  try{
    const {petId} = req.params;
    const {userid} = req.body
    const user = await userCol.findById(userid);
    user.fosteredPets = [...user.fosteredPets, petId];
    const updatedUser = await user.save();
    updateNewsAdoptionStatus(updatedUser, petId, 'fostered')
    res.send(updatedUser);
  }catch(err) {
    res.status(500).send("problem with addPetToFosteredUser");
  }
}

const verifyUser = async (req, res)=>{
  try{
    const {userid} = req.body
    const user = await userCol.findById(userid)
    res.send(user)
  }catch(err){console.log(err)}
}

const setAdmin = async (req, res)=>{
  try{
    const {userid}=req.body
    const {id} = req.params
   const user = await userCol.findById(userid)
    if (user.admin){
      const newAdmin = await userCol.findById(id)
      newAdmin.admin = true
      const updatedAdmin = await newAdmin.save()
      res.send(updatedAdmin)
    }
  } catch(err){console.log(err)}
}

const removeAdmin = async (req, res)=>{
  try{
    const {userid}=req.body
    const {id} = req.params
   const user = await userCol.findById(userid)
    if (user.admin){
      const newAdmin = await userCol.findById(id)
      newAdmin.admin = false
      const updatedAdmin = await newAdmin.save()
      res.send(updatedAdmin)
    }
  } catch(err){console.log(err)}
}

const findUser = async (req, res)=>{
  try{
    const {id}=req.params
    const user = await userCol.findById(id)
    res.send(user)
  } catch(err){console.log(err)}
}

module.exports = { login, signup, updateUser, getAllUsers, addPetToFavorites, addPetToAdopted, removePetFromFavorites, removePetFromAdoped, addPetToFosteredUser, handleLogout, verifyUser, setAdmin, removeAdmin, findUser};
