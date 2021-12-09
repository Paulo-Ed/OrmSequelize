const dataBase = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
        const { data_inicial, data_final} = req.query
        const where = {}

        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null
        
        try {
            const todasAsTurmas = await dataBase.Turmas.findAll( { where })
            return res.status(200).json(todasAsTurmas)
        } 
        catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //Retorna uma Turma
    static async pegaUmaTurma(req, res){
        const { id } = req.params
        try {
             const umaTurma = await dataBase.Turmas.findOne({
                 where: {
                     id: Number(id)
                 }
             })
             return res.status(200).json(umaTurma)
         }
        catch (error) {
             return res.status(500).json(error.message)
        }
     } 
     //Adiciona Registro de Pessoa
     static async criaTurma(req, res){
         const novaTurma = req.body
         try {
             const novaTurmaCriada = await dataBase.Turmas.create(novaTurma)
             return res.status(200).json(novaTurmaCriada)
         }
         catch (error) {
             return res.status(500).json(error.message)
         }
     }
     //Atualiza Registro de Turma
     static async atualizaTurma(req, res){
         const { id } = req.params
         const novaTurma = req.body
         try {
             await dataBase.Pessoas.update(novaTurma, {
                 where: {
                     id: Number(id)
                 }
             })
             const turmaAtualizada = await dataBase.Turmas.findOne({where: { id: Number(id)}})
             return res.status(200).json(turmaAtualizada)
         }
         catch (error) {
             return res.status(500).json(error.message)
         }
     }
     //Apaga Registro de Turma
    static async apagaTurma(req, res){
         const { id } = req.params
         try {
             await dataBase.Turmas.destroy({where: { id: Number(id) }})
             return res.status(200).json(`Registro ${id} Apagado com Sucesso`)
         }
         catch (error) {
             return res.status(500).json(error.message)
         }
    }

    //Restaura Turma
    static async restauraTurma(req, res) {
        const { id } = req.params
        try {
            await dataBase.Turmas.restore( {where: { id: Number(id)}})
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController