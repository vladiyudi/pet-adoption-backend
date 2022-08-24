const express = require('express')
const router = express.Router()
const {signup, login, updateUser, getAllUsers, addPetToFavorites, addPetToAdopted, removePetFromFavorites, removePetFromAdoped, addPetToFosteredUser, handleLogout} = require('../Controllers/userControllers.js')
const {validateSignup, passwordMatch, validateNewUser, validateLogin, validatePasswordMatch, validateEmail, validateUpdateUser, auth}=require('../Middleware/authMiddlewre')
const {signUpSchema, loginSchema, updateSchema}=require('../Schemas/Schemas.js')

router.post('/signUp', passwordMatch, validateSignup(signUpSchema), validateNewUser, signup)

router.post('/login', validateLogin(loginSchema), validateEmail, validatePasswordMatch, login)

router.get('/logout', auth, handleLogout)

router.put('/:id', 
validateUpdateUser(updateSchema), 
updateUser)

router.get('/all', auth, getAllUsers)

router.post('/:uid/favorites', auth, addPetToFavorites)

router.post('/:uid/adopted', auth, addPetToAdopted)

router.delete('/:uid/favorites/:petId', removePetFromFavorites)

router.delete('/:uid/adopted/:petID', auth,removePetFromAdoped)

router.get('/:uid/foster/:petId', 
auth, 
addPetToFosteredUser)

module.exports = router