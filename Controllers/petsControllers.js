const { v4: uuidv4 } = require("uuid");
const {getPetsFromDB} = require("../Models/petsModels");

const getAllPets =async (req, res) => {
    try {
        const allPets = await getPetsFromDB();
        res.send(allPets);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {getAllPets};