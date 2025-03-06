import mongoose, { Schema } from "mongoose";

const UsuariosSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    numeroTelefone: {type: String, required: true, unique: true}
});

const Usuario = mongoose.model("Usuario", UsuariosSchema);

export {Usuario, UsuariosSchema};