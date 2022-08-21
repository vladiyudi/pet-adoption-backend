const express = require('express')
const router = express.Router()
const {getAllPets, addNewPet, searchPets, addPetToAdopted, removefromAdopted, addToFostered} = require('../Controllers/petsControllers')

router.get('/', getAllPets)

router.post('/add', addNewPet)

router.post('/search', searchPets)

router.get('/adopt/:uid/:petId', addPetToAdopted)

router.delete('/adopted/:petId', removefromAdopted)

router.put('/:petId/foster/:userId', addToFostered)

module.exports = router