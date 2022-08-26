const Ajv = require("ajv");
const ajv = new Ajv();
const bcrypt = require("bcrypt");
const addFormats = require("ajv-formats");
addFormats(ajv);
const { getMongoUserByEmail } = require("../Models/usersModels");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function validateSignup(schema) {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0]);
      return;
    }
    next();
  };
}

const validateUpdateUser = (schema) => {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0]);
      return;
    }
    next();
  };
};

const validateLogin = (schema) => {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0]);
      return;
    }
    next();
  };
};

const validateNewUser = async (req, res, next) => {
const existingMongoU = await getMongoUserByEmail(req.body.email);
  if (!existingMongoU) {
    next();
  } else {
    res.status(400).send("User already exists");
  }
};

const passwordMatch = (req, res, next) => {
  if (req.body.password1 !== req.body.password2) {
    res.status(400).send("Passwords do not match");
    return;
  }
  next();
};


const validatePasswordMatch = async (req, res, next) => {
  const existingMongoU = await getMongoUserByEmail(req.body.email);
  bcrypt.compare(req.body.password, existingMongoU.password,(err, result) => {if (result) {
    req.body = existingMongoU
    next()} 
    else res.status(400).send("Password is incorrect");
  return
} );

};

const validateEmail = async (req, res, next) => {
  const existingMongoU = await getMongoUserByEmail(req.body.email);
  if (existingMongoU) next();
  else {
    res.status(400).send("User doesn't exist");
    return;
  }
};

const auth = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Unauthorized");
      return;
    }
    req.body.userid = decoded.id;
    next();
  }
  );
}

module.exports = {
  validateSignup,
  passwordMatch,
  validateNewUser,
  validateLogin,
  validatePasswordMatch,
  validateEmail,
  validateUpdateUser,
  auth,
};
