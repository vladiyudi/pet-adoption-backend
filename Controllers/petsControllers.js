const { v4: uuidv4 } = require("uuid");
const {queryPetsfromMongo, updatePetStatusAdopted} = require("../Models/petsModels");
const petCol = require('../Schemas/petSchema');
const multer = require('multer')

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
        // console.log(req.body.picture)
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

const addPetToAdopted = async (req, res) => {
    try{
        const {uid, petId} = req.params;
        const updatedPet = await updatePetStatusAdopted(petId, uid);
        res.send(updatedPet);
    } catch (err) {
        console.log(err);
    }
}

const removefromAdopted = async (req, res) => {
    try{
        const {petId}= req.params;
        const pet = await petCol.findById(petId);
        pet.adoptionStatus = "Available";
        pet.owner = "";
        const updatedPet = await pet.save();
        res.send(updatedPet);
    } catch (err) {
        console.log(err);
    }
}

const addToFostered = async (req, res) => {
    try{
        const {petId, userId} = req.params;
        // console.log(petId, userId)
        const pet = await petCol.findById(petId);
        pet.adoptionStatus = "Fostered";
        pet.owner = userId;
        const updatedPet = await pet.save();
        res.send(updatedPet);
    }
     catch (err) {
        console.log(err);  
}}
const editPet = async (req, res) => {
    try{
        const {petId} = req.params;
        const {name, type, breed, weight, height, color, hypoallergenic, bio, dietary, picture} = req.body;
        const pet = await petCol.findById(petId);
        pet.name = name;
        pet.breed = breed;
        pet.type = type;
        pet.bio = bio;
        pet.hypoallergenic = hypoallergenic;
        pet.dietary = dietary;
        pet.weight = weight;
        pet.height = height;
        pet.color = color;
        pet.picture = picture;
        const updatedPet = await pet.save();
        res.send(updatedPet);
    }catch(err){
        console.log(err);
    }
}
module.exports = {getAllPets, addNewPet, searchPets, addPetToAdopted, removefromAdopted, addToFostered, editPet};