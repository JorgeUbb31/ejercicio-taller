"use strict";
import { Pedidos } from "../entity/pedidos.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getPedidosService(query) {
    try {
        const { id, rutCliente } = query;
        const pedidosRepo = AppDataSource.getRepository(Pedidos);
        const pedidosData = await pedidosRepo.find({ where: { id, rutCliente } });
        return pedidosData;
    } catch (error) {
        throw new Error("Error al obtener los pedidos");
    }
}

export async function createPedidosService(pedidoData) {
    try {
        const pedidosRepo = AppDataSource.getRepository(Pedidos);
        const newPedido = pedidosRepo.create(pedidoData);
        await pedidosRepo.save(newPedido);
        return newPedido;
    } catch (error) {
        throw new Error("Error al crear el pedido");
    }
}

export async function updatePedidosService(id, updateData) {
    try {
        const pedidosRepo = AppDataSource.getRepository(Pedidos);
        const pedidoToUpdate = await pedidosRepo.findOne({ where: { id } });
        if (!pedidoToUpdate) {
            throw new Error("Pedido no encontrado");
        }
        Object.assign(pedidoToUpdate, updateData);
        await pedidosRepo.save(pedidoToUpdate);
        return pedidoToUpdate;
    } catch (error) {
        throw new Error("Error al actualizar el pedido");
    }
}

export async function deletePedidosService(id) {
    try {
        const pedidosRepo = AppDataSource.getRepository(Pedidos);
        const pedidoToDelete = await pedidosRepo.findOne({ where: { id } });
        if (!pedidoToDelete) {
            throw new Error("Pedido no encontrado");
        }
        await pedidosRepo.remove(pedidoToDelete);
        return pedidoToDelete;
    } catch (error) {
        throw new Error("Error al eliminar el pedido");
    }
}
