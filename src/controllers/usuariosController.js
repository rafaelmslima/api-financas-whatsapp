import { Usuario } from "../models/usuarios.js";

class UsuarioController {
    static async cadastrarUsuario(req, res) {
        try {
            const {nome, numeroTelefone} = req.body;

            if (!nome || !numeroTelefone) {
                res.status(400).json({message: "Nome e numero de telefone são obrigatórios"});
            }
            let usuario = await Usuario.findOne({numeroTelefone}); //Verifica se já existe esse numero cadastrado
            
            if (!usuario) {
                usuario = await Usuario.create({nome, numeroTelefone});
            }
            res.satus(200).json("Usuario cadastrado com Sucesso!", usuario)
        } catch (e) {
            res.status(500).json({message: "Erro ao cadastrar Usuário"}, e.message)
        }
    }

    static async obterUsuarioPorNumero (req, res) {
        try {
            const {numeroTelefone} = req.params;
            const usuario = await Usuario.findOne({numeroTelefone});

            if (!usuario) {
                res.status(400).json({message: "Usuário não encontrado"});
            }
            res.status(200).json(usuario);
        } catch(e) {
            res.status(500).json({message: "Erro ao procurar usuario"})
        }
    }
}

export default UsuarioController;