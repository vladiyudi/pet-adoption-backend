const fs = require("fs").promises;
const path = require("path");
const bcrypt = require('bcrypt');

const pathUsersDb = path.resolve(__dirname, "../database/usersDb.json");

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


module.exports = {addUserToDB, getUserByEmail, getAllUsers, hashPassword};