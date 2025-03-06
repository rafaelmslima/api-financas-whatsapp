import mongoose from "mongoose";

const gastosSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    valor: {type: Number, required: true},
    categoria: {type: String, required: true},
    descricao: {type: String},
    data: {type: Date, default: Date.now}
});

const Gasto = mongoose.model("gastos", gastosSchema);

export { Gasto, gastosSchema};