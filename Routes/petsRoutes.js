const express = require('express')
const router = express.Router()
const {getAllPets} = require('../Controllers/petsControllers')

router.get('/', getAllPets)

module.exports = router