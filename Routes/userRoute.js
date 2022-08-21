const express = require('express')
const router = express.Router()
const {signup, login, updateUser, getAllUsers, addPetToFavorites, addPetToAdopted, removePetFromFavorites, removePetFromAdoped, addPetToFosteredUser} = require('../Controllers/userControllers.js')
const {validateSignup, passwordMatch, validateNewUser, validateLogin, validatePasswordMatch, validateEmail, validateUpdateUser}=require('../Middleware/authMiddlewre')
const {signUpSchema, loginSchema, updateSchema}=require('../Schemas/Schemas.js')

router.post('/signUp', passwordMatch, validateSignup(signUpSchema), validateNewUser, signup)

router.post('/login', validateLogin(loginSchema), validateEmail, validatePasswordMatch, login)

router.put('/:id', 
validateUpdateUser(updateSchema), 
updateUser)

router.get('/all', getAllUsers)

router.post('/:uid/favorites', addPetToFavorites)

router.post('/:uid/adopted', addPetToAdopted)

router.delete('/:uid/favorites/:petId', removePetFromFavorites)

router.delete('/:uid/adopted/:petID', removePetFromAdoped)

router.put('/:uid/foster/:petId', addPetToFosteredUser)

module.exports = router