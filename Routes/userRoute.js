const express = require('express')
const router = express.Router()
const {signup, login} = require('../Controllers/userControllers.js')
const {validateSignup, passwordMatch, validateNewUser, validateLogin, validatePasswordMatch, validateEmail}=require('../Middleware/authMiddlewre')
const {signUpSchema, loginSchema}=require('../Schemas/Schemas.js')

router.post('/signUp', passwordMatch, validateSignup(signUpSchema), validateNewUser, signup)

router.post('/login', validateLogin(loginSchema), validateEmail, validatePasswordMatch, login)

module.exports = router