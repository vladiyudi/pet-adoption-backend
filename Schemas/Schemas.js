const signUpSchema = {
  type: "object",
  properties: {
    userName: {type: "string", minLength: 2, maxLength: 50},
    email: { type: "string", format: "email" },
    password1: { type: "string", minLength: 2 },
    password2: { type: "string", minLength: 2 },
  },
  required: ["email", "password1", "password2"],
    additionalProperties: false,
};

const loginSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 2 },
    },
    required: ["email", "password"],
}

const updateSchema = {
type: "object",
properties: {
    userName: {type: "string", minLength: 2, maxLength: 50},
    email: { type: "string", format: "email" },
    lastName: { type: "string", maxLength: 50},
    phone: { type: "string", maxLength: 10},
    bio: { type: "string", maxLength: 500},
    _id: { type: "string" },
    // password: { type: "string"},
    date: { type: "string"},
    phoneNumber: { type: "string"},
    addoptedPets: { type: "array"},
    fosteredPets: { type: "array"},
}
}

module.exports = { signUpSchema, loginSchema, updateSchema };
