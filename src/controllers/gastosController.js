import { Gasto } from "../models/gastos.js";
import mongoose from "mongoose";

class GastosController {
    static async listarGastos (req, res) {
        try {
            const listaGastos = await Gasto.find({});
            res.status(200).json(listaGastos);
        } catch (e) {
            res.status(500).json({message: `${e.message}`});
        };
    }

    static async listarGastoPorId (req, res) {
        try {
            const id = req.params.id;

            const gastoEncontrado = await Gasto.findById(id);
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
            const {valor, categoria} = req.body;

            if (!valor || !categoria ) {
                return res.status(400).send("Valor e categoria são obrigatórios!");
            }

            const novoGasto = await Gasto.create(req.body);

            res.status(201).json({
                message: "Cadastrado com sucesso!",
                Gasto: novoGasto
            });
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}
    static async obterGastosPorCategoria(req, res) {
        try {
            const dataAtual = new Date();
            const primeiroDiaMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
            const proximoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 1);
    
            // Buscar gastos do mês atual
            const gastosPorCategoria = await Gasto.aggregate([
                {
                    $match: {
                        data: {
                            $gte: primeiroDiaMes, // Primeiro dia do mês
                            $lt: proximoMes       // Primeiro dia do próximo mês
                        }
                    }
                },
                {
                    $group: {
                        _id: "$categoria",
                        totalGasto: { $sum: "$valor" },
                        quantidadeGastos: { $sum: 1 }
                    }
                },
                {
                    $sort: { totalGasto: -1 }
                }
            ]);
    
            res.status(200).json(gastosPorCategoria);
    
        } catch (e) {
            res.status(500).json({ message: "Erro ao obter gastos por categoria", erro: e.message });
        }
    }
}    

export default GastosController;