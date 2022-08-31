const { v4: uuidv4 } = require("uuid");
const {queryPetsfromMongo, updatePetStatusAdopted, updateNewsPet} = require("../Models/petsModels");
const petCol = require('../Schemas/petSchema');
const multer = require('multer')
const newsCol = require('../Schemas/newsSchema')

const getAllPets =async (req, res) => {
    try {
        const allPets = await petCol.find().sort({
            dateCreated: -1});
        res.send(allPets);
    } catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
}

const addNewPet = async (req, res) => {
    try {
        const newPet = new petCol(req.body);
        const savedPet = await newPet.save();
        updateNewsPet(req.body)
        res.send(savedPet);
    } catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
}

const searchPets = async (req, res) => {
    try {
        const searchResult = await queryPetsfromMongo(req.body)
        res.send(searchResult);
    } catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
}

const addPetToAdopted = async (req, res, next) => {
    try{
        const {petId} = req.params;
        const {userid} = req.body
        const updatedPet = await updatePetStatusAdopted(petId, userid);
        req.body.pet = updatedPet
        res.send(updatedPet);
        next()
    } catch (err) {
        res.status(500).send(err)
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
        res.status(500).send(err)
        console.log(err);
    }
}

const addToFostered = async (req, res) => {
    try{
        const {petId} = req.params;
        const {userid} = req.body
        const pet = await petCol.findById(petId);
        pet.adoptionStatus = "Fostered";
        pet.owner = userid;
        const updatedPet = await pet.save();
        res.send(updatedPet);
    }
     catch (err) {
        res.status(500).send(err)
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
        if (picture) pet.picture = picture;
        const updatedPet = await pet.save();
        res.send(updatedPet);
    }catch(err){
        res.status(400).send(err)
        console.log(err);
    }
}

const findPet = async (req, res)=>{
    try{
    const {id} = req.params
    const pet = await petCol.findById(id)
    res.send(pet)} catch (err){
        res.status(400).send(err)
        console.log(err)
    }
}

const fetchNews = async (req, res)=>{
try{
    const news = await newsCol.find().sort({
        dateCreated: -1});
    res.send(news)
}catch (err){
    res.status(400).send(err)
    console.log(err)
}
}


module.exports = {getAllPets, addNewPet, searchPets, addPetToAdopted, removefromAdopted, addToFostered, editPet, findPet, fetchNews};