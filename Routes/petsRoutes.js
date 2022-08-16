const express = require('express')
const router = express.Router()
const {getAllPets, addNewPet} = require('../Controllers/petsControllers')

router.get('/', getAllPets)

router.post('/add', addNewPet)

module.exports = router