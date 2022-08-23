const express = require('express')
const router = express.Router()
const {getAllPets, addNewPet, searchPets, addPetToAdopted, removefromAdopted, addToFostered, editPet} = require('../Controllers/petsControllers')
const {upload, uploadToCloudinary} = require('../Middleware/petMiddlewere')

router.get('/', getAllPets)

router.post('/add', upload.single('picture'), uploadToCloudinary, addNewPet)

router.post('/search', searchPets)

router.get('/adopt/:uid/:petId', addPetToAdopted)

router.delete('/adopted/:petId', removefromAdopted)

router.put('/:petId/foster/:userId', addToFostered)

router.put('/edit/:petId', upload.single('picture'), uploadToCloudinary, editPet)

module.exports = router