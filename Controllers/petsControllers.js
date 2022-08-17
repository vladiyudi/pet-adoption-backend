const { v4: uuidv4 } = require("uuid");
const {queryPetsfromMongo} = require("../Models/petsModels");
const petCol = require('../Schemas/petSchema');

const getAllPets =async (req, res) => {
    try {
        const allPets = await petCol.find().sort({
            dateCreated: -1});
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

const searchPets = async (req, res) => {
    try {
        const searchResult = await queryPetsfromMongo(req.body)
        res.send(searchResult);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {getAllPets, addNewPet, searchPets};