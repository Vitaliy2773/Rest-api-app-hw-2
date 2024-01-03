const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().min(10),
}).min(1);

module.exports = {
  createContactSchema,
  updateContactSchema,
};