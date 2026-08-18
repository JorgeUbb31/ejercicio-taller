"use strict";
import { 
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";
import { 
    pedidosValidation,
    pedidosQueryValidation,
    updatePedidosValidation
} from "../validations/pedidos.validation.js"
import {
    getPedidosService,
    createPedidosService,
    updatePedidosService,
    deletePedidosService
} from "../services/pedidos.service.js";

export async function getPedidos(req, res) {
    try {
        const { id, rutCliente, telefonoCliente } = req.query;
        const pedidosData = await getPedidosService({ id, rutCliente, telefonoCliente });
        handleSuccess(res, 200, pedidosData);
    } catch (error) {
        handleErrorClient(res, 400, error.message);
    }
}

export async function createPedido(req, res) {
    try {
        const { body } = req;
        const { error } = pedidosValidation.validate(body);
        if (error) return handleErrorClient(res, 400, error.message);
        const newPedido = await createPedidosService(body);
        handleSuccess(res, 201, newPedido);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createPedidos(req, res) {
    try {
        const { body } = req;
        const { error } = pedidosValidation.validate(body);
        if (error) return handleErrorClient(res, 400, error.message);
        const newPedido = await createPedidosService(body);
        handleSuccess(res, 201, newPedido);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updatePedidos(req, res) {
    try {
        const { id } = req.query;
        const { body } = req;
        const { error: queryError } = pedidosQueryValidation.validate({ id });
        if (queryError) return handleErrorClient(res, 400, queryError.message);
        const { error: bodyError } = updatePedidosValidation.validate(body);
        if (bodyError) return handleErrorClient(res, 400, bodyError.message);
        const updatedPedido = await updatePedidosService(id, body);
        handleSuccess(res, 200, updatedPedido);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deletePedidos(req, res) {
    try {
        const { id } = req.query;
        const { error } = pedidosQueryValidation.validate({ id });
        if (error) return handleErrorClient(res, 400, error.message);
        const deletedPedido = await deletePedidosService(id);
        handleSuccess(res, 200, deletedPedido);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
