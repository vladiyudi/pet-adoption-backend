const fs = require("fs").promises;
const path = require("path");

const pathToPetsDb = path.resolve(__dirname, "../database/petsDb.json");

const getPetsFromDB = async () => {
    try {
        const allPets = await fs.readFile(pathToPetsDb, "utf8");
        return JSON.parse(allPets);
    } catch (err) {
        console.log(err);
    }
}
module.exports = {getPetsFromDB};