import Joi from "joi";

const createOrderSchema = Joi.object({
    orderNumber: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        price: Joi.number().min(0.1).required(),
      })
    )
    .min(1)
    .required(),
  status: Joi.string().valid("NEW", "SHIPPED", "DELIVERED").default("NEW").required()
});

export default createOrderSchema;
