"use strict";
import joi from "joi";

const rutValidator = (value, helper) => {
  const rutRegex = /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/;
  if (!rutRegex.test(value)) {
    return helper.message("Invalid RUT format");
  }
  return true;
};

const totalValidator = (value, helper) => {
  if (value < 0) {
    return helper.message("El total no puede ser negativo ni cero");
  }
    return true;
};

const pedidosValidation = joi.object({
  nombreCliente: joi.string().max(255).required(),
  rutCliente: joi.string().custom(rutValidator).required(),
  direccionCliente: joi.string().max(255).required(),
  telefonoCliente: joi.string().max(20).required(),
  productos: joi.array().items(
    joi.object({
      id: joi.number().integer().positive().required(),
      nombre: joi.string().max(255).required(),
      precio: joi.number().precision(10, 2).positive().required(),
      cantidad: joi.number().integer().positive().required(),
    })
  ).min(1).required(),
  total: joi.number().precision(10, 2).custom(totalValidator).required(),
});

const telefonoClienteValidator = (value, helper) => {
  const telefonoRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    if (!telefonoRegex.test(value)) {
    return helper.message("Formato de teléfono inválido");
  }
    return true;
};

const pedidosQueryValidation = joi.object({
  id: joi.number().integer().positive(),
  rutCliente: joi.string().custom(rutValidator),
  telefonoCliente: joi.string().custom(telefonoClienteValidator),
}).or("id", "rutCliente", "telefonoCliente");



export { pedidosValidation, pedidosQueryValidation, totalValidator };

const updatePedidosValidation = joi.object({
  nombreCliente: joi.string().max(255),
  rutCliente: joi.string().custom(rutValidator),
  direccionCliente: joi.string().max(255),
  telefonoCliente: joi.string().custom(telefonoClienteValidator),
  productos: joi.array().items(
  joi.object({
    id: joi.number().integer().positive().required(),
    nombre: joi.string().max(255).required(),
    precio: joi.number().precision(10, 2).positive().required(),
    cantidad: joi.number().integer().positive().required(),
  })
  ).min(1),
  total: joi.number().precision(10, 2).custom(totalValidator),
  estado: joi.string().valid("pendiente", "en proceso", "completado", "cancelado"),
});

export { updatePedidosValidation };