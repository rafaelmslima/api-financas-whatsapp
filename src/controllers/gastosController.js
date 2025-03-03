import { gasto } from "../models/gastos.js";
import mongoose from "mongoose";

class GastosController {
    static async listarGastos (req, res) {
        try {
            const listaGastos = await gasto.find({});
            res.status(200).json(listaGastos);
        } catch (e) {
            res.status(500).json({message: `${e.message}`});
        };
    }

    static async listarGastoPorId (req, res) {
        try {
            const id = req.params.id;

            const gastoEncontrado = await gasto.findById(id);
            if (gastoEncontrado !== null) {
                res.status(200).json(gastoEncontrado);
            } else {
                res.status(404).json({message: "Gasto não encontrado"});
            }
        } catch (e) {
            if (e instanceof mongoose.Error.CastError) {
                res.status(400).send({message: "Um ou mais dados do ID estão incorretos"});
            } else {
                res.status(500).send({message: "Erro interno do servidor"});
            }
        }
    }
    static async cadastrarGasto (req, res) {
        try {
            const novoGasto = await gasto.create(req.body);
            res.status(201).json({message: "Cadastrado com sucesso!"});
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}
}

export default GastosController;