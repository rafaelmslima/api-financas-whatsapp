import express from "express";
import routes from "./routes/index.js";
import conectaNaDatabase from "./config/dbConnect.js";

const app = express();
routes(app);

const conexao = await conectaNaDatabase();

conexao.on("Error", (erro) => {
    console.log("Erro de Conexão", erro);
})

conexao.once("open", () => {
    console.log("Conexão com o banco feita com Sucesso!")
})

export default app;