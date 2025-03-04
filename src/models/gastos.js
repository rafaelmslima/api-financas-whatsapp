import mongoose from "mongoose";

const gastosSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    tipo: {type: String, required: true},
    valor: {type: Number, required: true},
}, {Timestamps: true});

const gasto = mongoose.model("gastos", gastosSchema);

export { gasto, gastosSchema};