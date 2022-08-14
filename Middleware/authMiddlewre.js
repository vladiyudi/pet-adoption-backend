const Ajv = require("ajv");
const ajv = new Ajv();
const bcrypt = require("bcrypt");
const addFormats = require("ajv-formats");
addFormats(ajv);
const { getUserByEmail, getAllUsers } = require("../Models/usersModels");

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
  const existingUser = await getUserByEmail(req.body.email);
  if (!existingUser) {
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

//   const validateUserAndPassword = async (req, res, next) => {
//     const user = await getUserByEmailAndPassword(req.body.email, req.body.password)
//     if (!user) {
//       res.status(400).send("User does not exist");
//       return;
//     } else {
//       next();
//     }
//   }

const validatePasswordMatch = async (req, res, next) => {
  const user = await getUserByEmail(req.body.email);
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      next();
    } else {
      res.status(400).send("Password is incorrect");
      return;
    }
  });
};

const validateEmail = async (req, res, next) => {
  const allUsers = await getAllUsers();
  const user = allUsers.find((user) => user.email === req.body.email);
  if (user) next();
  else {
    res.status(400).send("User doesn't exist");
    return;
  }
};

module.exports = {
  validateSignup,
  passwordMatch,
  validateNewUser,
  validateLogin,
  validatePasswordMatch,
  validateEmail,
  validateUpdateUser,
};
