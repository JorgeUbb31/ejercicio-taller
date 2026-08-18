"use strict";
import { EntitySchema } from "typeorm";

const PedidosSchema = new EntitySchema({
    name: "Pedidos",
    tableName: "pedidos",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombreCliente: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        rutCliente: {
            type: "varchar",
            length: 12,
            nullable: false,
        },
        direccionCliente: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        telefonoCliente: {
            type: "varchar",
            length: 20,
            nullable: false,
        },
        productos: {
            type: "json",
            nullable: false,
        },
        total: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false,
        },
        estado: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    indices: [
        {
            name: "IDX_PEDIDOS",
            columns: ["id"],
            unique: true,
        },
    ],
});