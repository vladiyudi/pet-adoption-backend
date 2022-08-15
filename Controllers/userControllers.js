const { Console } = require("console");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const {
  addUserToDB,
  getUserByEmail,
  hashPassword,
  saveUser,
} = require("../Models/usersModels");
const { getMongoUserByEmail } = require("../Models/usersModels");
const userCol = require("../Schemas/mongooseSchemas");
const { findById } = require("../Schemas/mongooseSchemas");

const signup = async (req, res) => {
  try {
    const { userName, email, password1 } = req.body;
    const hasshedPassword = await hashPassword(password1);
    const user = {
      userName,
      email,
      password: hasshedPassword,
      date: new Date().toLocaleString(),
      lastName: "",
      phoneNumber: "",
      bio: "",
      adoptedPets: [],
      fosteredPets: [],
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
    console.log(id);
    const { userName, email, lastName, bio, phoneNumber } = req.body;

    console.log(req.body);

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

module.exports = { login, signup, updateUser };
