const Joi = require("joi");

const UserValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .max(20)
    .required(),

  role: Joi.string()
    .valid("admin", "manager", "user")
    .optional()
});


const FlowerValidation = Joi.object({
      name: Joi.string()
    .min(2)
    .max(100)
    .required(),

  price: Joi.string()
    .min(1)
    .required(),

  description: Joi.string()
    .max(500)
    .optional(),

  stock: Joi.number()
    .min(0)
    .required()
});

const OrderValidation = Joi.object({
  flowerId: Joi.string().required(),

  quantity: Joi.number()
    .min(1)
    .required(),

  deliveryAddress: Joi.string()
    .min(10)
    .max(300)
    .required(),

  deliveryDate: Joi.date()
    .greater("now")
    .required(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
});





module.exports = { UserValidation, FlowerValidation, OrderValidation };
