const express = require('express')
const router = express.Router()
const {signup, login, updateUser, getAllUsers, addPetToFavorites, addPetToAdopted, removePetFromFavorites, removePetFromAdoped, addPetToFosteredUser, handleLogout, verifyUser, setAdmin, removeAdmin} = require('../Controllers/userControllers.js')
const {validateSignup, passwordMatch, validateNewUser, validateLogin, validatePasswordMatch, validateEmail, validateUpdateUser, auth}=require('../Middleware/authMiddlewre')
const {signUpSchema, loginSchema, updateSchema}=require('../Schemas/Schemas.js')

router.post('/signUp', passwordMatch, validateSignup(signUpSchema), validateNewUser, signup)

router.post('/login', validateLogin(loginSchema), validateEmail, validatePasswordMatch, login)

router.get('/logout', auth, handleLogout)

router.put('/update', auth,
validateUpdateUser(updateSchema), 
updateUser)

router.get('/all', auth, getAllUsers)

router.post('/favorites', auth, addPetToFavorites)

router.post('/adopted', auth, addPetToAdopted)

router.delete('/favorites/:petId', auth,removePetFromFavorites)

router.delete('/adopted/:petID', auth,removePetFromAdoped)

router.get('/foster/:petId', auth, 
addPetToFosteredUser)

router.get('/verify', auth, verifyUser)

router.get('/admin/:id', auth, setAdmin)

router.get('/remove/:id', auth, removeAdmin ) 

module.exports = router