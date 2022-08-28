const express = require('express')
const router = express.Router()
const {getAllPets, addNewPet, searchPets, addPetToAdopted, removefromAdopted, addToFostered, editPet, findPet, fetchNews} = require('../Controllers/petsControllers')
const {upload, uploadToCloudinary} = require('../Middleware/petMiddlewere')
const {auth} = require('../Middleware/authMiddlewre')

router.get('/', getAllPets)

router.post('/add', auth, upload.single('picture'), uploadToCloudinary, addNewPet)

router.post('/search', searchPets)

router.get('/adopt/:petId', auth, addPetToAdopted)

router.delete('/adopted/:petId', auth, removefromAdopted)

router.get('/:petId/foster', auth, addToFostered)

router.put('/edit/:petId', auth, upload.single('picture'), uploadToCloudinary, editPet)

router.get('/find/:id', auth, findPet)

router.get('/news', auth, fetchNews)

module.exports = router