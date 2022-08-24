const express = require('express')
const router = express.Router()
const {getAllPets, addNewPet, searchPets, addPetToAdopted, removefromAdopted, addToFostered, editPet} = require('../Controllers/petsControllers')
const {upload, uploadToCloudinary} = require('../Middleware/petMiddlewere')
const {auth} = require('../Middleware/authMiddlewre')

router.get('/', getAllPets)

router.post('/add', auth, upload.single('picture'), uploadToCloudinary, addNewPet)

router.post('/search', searchPets)

router.get('/adopt/:uid/:petId', auth, addPetToAdopted)

router.delete('/adopted/:petId', auth, removefromAdopted)

router.get('/:petId/foster/:userId', 
auth, 
addToFostered)

router.put('/edit/:petId', auth, upload.single('picture'), uploadToCloudinary, editPet)

module.exports = router