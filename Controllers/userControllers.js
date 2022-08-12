const { v4: uuidv4 } = require("uuid");

const {addUserToDB, getUserByEmailAndPassword} = require("../Models/usersModels");

const signup = (req, res)=>{
try{
    console.log("req.nody", req.body)
    const {userName, email, password1, password2} = req.body
    const user = {userName, email, password: password1, date: new Date().toLocaleString(), id: uuidv4()}
    const addUser = addUserToDB(user)
    if (addUser) res.send(user) 
} catch (err){
    res.status(500).send('problem with signup')
}
}

const login = async (req, res)=>{
    try{
        const user = await getUserByEmailAndPassword(req.body.email, req.body.password)
        if (user) res.send(user)
    } catch (err){
        res.status(500).send('problem with login')
    }
}


module.exports = {login, signup}