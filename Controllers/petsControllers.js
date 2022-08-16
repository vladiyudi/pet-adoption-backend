const { v4: uuidv4 } = require("uuid");
const {getPetsFromDB} = require("../Models/petsModels");
const petCol = require('../Schemas/petSchema');

const getAllPets =async (req, res) => {
    try {
        const allPets = await getPetsFromDB();
        res.send(allPets);
    } catch (err) {
        console.log(err);
    }
}

const addNewPet = async (req, res) => {
    try {
        const newPet = new petCol(req.body);
        const savedPet = await newPet.save();
        res.send(savedPet);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {getAllPets, addNewPet};