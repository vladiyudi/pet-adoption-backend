const express = require('express')
const router = express.Router()
const {signup, login, updateUser, getAllUsers} = require('../Controllers/userControllers.js')
const {validateSignup, passwordMatch, validateNewUser, validateLogin, validatePasswordMatch, validateEmail, validateUpdateUser}=require('../Middleware/authMiddlewre')
const {signUpSchema, loginSchema, updateSchema}=require('../Schemas/Schemas.js')

router.post('/signUp', passwordMatch, validateSignup(signUpSchema), validateNewUser, signup)

router.post('/login', validateLogin(loginSchema), validateEmail, validatePasswordMatch, login)

router.put('/:id', 
validateUpdateUser(updateSchema), 
updateUser)

router.get('/all', getAllUsers)

module.exports = router