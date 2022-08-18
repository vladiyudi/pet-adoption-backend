const petCol = require("../Schemas/petSchema");

const queryPetsfromMongo = async (query) => {
  try {
    let { name, type, status, minHeight, maxHeight, minWeight, maxWeight } =
      query;
    // if (!status) status = "Available";
    if (!minHeight) minHeight = 1;
    if (!maxHeight) maxHeight = 100;
    if (!minWeight) minWeight = 1;
    if (!maxWeight) maxWeight = 100;
    const queryPets = await petCol
      .find({
        name: { $regex: name, $options: "i" },
        type: { $regex: type, $options: "i" },
        status: { $regex: status, $options: "i" },
        height: { $gte: minHeight, $lte: maxHeight },
        weight: { $gte: minWeight, $lte: maxWeight },
      })
      .sort({ dateCreated: -1 });
    return queryPets;
  } catch (err) {
    console.log(err);
  }
};

const updatePetStatusAdopted = async (petId, userId) => {
    try {
    const pet = await petCol.findById(petId);
    pet.adoptionStatus = "Adopted";
    pet.adoptedBy = userId;
    const savedPet = await pet.save();
    return savedPet;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { queryPetsfromMongo, updatePetStatusAdopted };
