const { Console } = require("console");
// const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const {
  hashPassword,
  saveUser,
} = require("../Models/usersModels");
const { getMongoUserByEmail } = require("../Models/usersModels");
const userCol = require("../Schemas/mongooseSchemas");
const {updatePetStatusAdopted} = require("../Models/petsModels");

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
    if (dbUser) res.send(dbUser);
  } catch (err) {
    res.status(500).send("problem with signup");
  }
};

const login = async (req, res) => {
  try {
    const mongoUser = await getMongoUserByEmail(req.body.email);
    if (mongoUser) res.send(mongoUser);
  } catch (err) {
    res.status(500).send("problem with login");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, lastName, bio, phoneNumber } = req.body;
    const user = await userCol.findById(id);
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
    const {uid} = req.params;

  // console.log(uid, petId);

    const user = await userCol.findById(uid);

    // console.log(user)

    user.interested = {...user.interested, [petId]: petId};
    const updatedUser = await user.save();
    res.send(updatedUser);
} catch (err) {
    res.status(500).send("problem with addPetToFavorites");
}
}

const removePetFromFavorites = async (req, res) => {
    try{
        const {uid, petId} = req.params;
        const user = await userCol.findById(uid);
        delete user.interested[petId];
        const updatedUser = await user.save();
        res.send(updatedUser);
    } catch (err) {
        res.status(500).send("problem with removePetFromFavorites");
    }
}

const addPetToAdopted = async (req, res) => {
try{
    const {petId} = req.body;
    const {uid} = req.params;
    const user = await userCol.findById(uid);
    user.adoptedPets = [...user.adoptedPets, petId];
    user.fosteredPets = user.fosteredPets.filter(pet => pet !== petId);
    const updatedUser = await user.save();
    // const updatedPet = await updatePetStatusAdopted(petId, uid);
    res.send(updatedUser);} 
    catch (err) {
    res.status(500).send("problem with addPetToAdopted");}
}

const removePetFromAdoped = async (req, res) => {
  try{
    const {uid, petID} = req.params;
    const user = await userCol.findById(uid);
    user.adoptedPets = user.adoptedPets.filter(pet => pet !== petID);
    const updatedUser = await user.save();
res.send(updatedUser);  
  }catch(err) {
    res.status(500).send("problem with removePetFromAdoped");
  }
}

const addPetToFosteredUser = async (req, res) => {
  try{
    const {uid, petId} = req.params;
    const user = await userCol.findById(uid);
    user.fosteredPets = [...user.fosteredPets, petId];
    const updatedUser = await user.save();
    res.send(updatedUser);
  }catch(err) {
    res.status(500).send("problem with addPetToFosteredUser");
  }
}

module.exports = { login, signup, updateUser, getAllUsers, addPetToFavorites, addPetToAdopted, removePetFromFavorites, removePetFromAdoped, addPetToFosteredUser };
