const express = require('express')
const router = express.Router()
const {getAllPets, addNewPet, searchPets, addPetToAdopted} = require('../Controllers/petsControllers')

router.get('/', getAllPets)

router.post('/add', addNewPet)

router.post('/search', searchPets)

router.get('/adopt/:uid/:petId', addPetToAdopted)

module.exports = router