const express = require('express')
const router = express.Router()
const {getAllPets, addNewPet, searchPets} = require('../Controllers/petsControllers')

router.get('/', getAllPets)

router.post('/add', addNewPet)

router.post('/search', searchPets)

module.exports = router