const fs = require("fs").promises;
const path = require("path");

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
      console.log(allUsers)
      const user = allUsers.find((user) => user.email === email);
      return user
    } catch (err) {
      console.log(err);
    }
  }

const getUserByEmailAndPassword = async (email, password) => {
    const allUsers = await getAllUsers();
    const user = allUsers.find((user) => user.email === email && user.password === password);
    return user;
}


module.exports = {addUserToDB, getUserByEmail, getUserByEmailAndPassword, getAllUsers}