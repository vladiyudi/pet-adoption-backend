const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const upload = multer({ dest: "./images" });

cloudinary.config({
  cloud_name: "dzdoelpvw",
  api_key: "218252426268331",
  api_secret: "j8zlWfSLTsNhHn2ri9AAnjIP_8g",
});

const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    res.status(400).send("No file uploaded");
    return;
  }
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    if (result) {
      req.body.picture = result.secure_url;
      fs.unlinkSync(req.file.path);
      next();
    }
  });
};

module.exports = { upload, uploadToCloudinary };
