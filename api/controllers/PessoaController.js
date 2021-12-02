const dataBase = require('../models')

class PessoaController {
    //Retorna todas as Pessoas
    static async retornaTodasAsPessoas(req, res){
        try {
            const todasAsPessoas = await dataBase.Pessoas.findAll()
        return res.status(200).json(todasAsPessoas)
        }
        catch (error){
        return res.status(500).json(error.message)
        }
    }
    //Retorna uma Pessoa
    static async retornaUmaPessoa(req, res){
       const { id } = req.params
       try {
            const umaPessoa = await dataBase.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umaPessoa)
        }
       catch (error) {
            return res.status(500).json(error.message)
       }
    } 
}

module.exports = PessoaController