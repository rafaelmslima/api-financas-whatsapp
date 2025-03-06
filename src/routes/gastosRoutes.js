import express from "express";
import GastosController from "../controllers/gastosController.js";

const routes = express.Router();

routes.get("/gastos", GastosController.listarGastos);
routes.get("/gastos/categoria", GastosController.obterGastosPorCategoria);
routes.post("/gastos", GastosController.cadastrarGasto);

export default routes;