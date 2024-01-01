const Joi = require("joi");

const validateContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error.message });
  }

  next();
};

module.exports = {
  validateContact,
};
