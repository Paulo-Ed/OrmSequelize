const dataBase = require('../models')
const Sequelize = require('sequelize')

class PessoaController {
    //Retorna todas as Pessoas Ativas
    static async retornaPessoasAtivas(req, res){
        try {
            const pessoasAtivas = await dataBase.Pessoas.findAll()
        return res.status(200).json(pessoasAtivas)
        }
        catch (error){
        return res.status(500).json(error.message)
        }
    }
    //Retorna todas as Pessoas
    static async retornaTodasAsPessoas(req, res){
        try {
            const todasAsPessoas = await dataBase.Pessoas.scope('todos').findAll()
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
    //Adiciona Registro de Pessoa
    static async criaPessoa(req, res){
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await dataBase.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //Atualiza Registro de Pessoa
    static async atualizaPessoa(req, res){
        const { id } = req.params
        const novasInformacoes = req.body
        try {
            await dataBase.Pessoas.update(novasInformacoes, {
                where: {
                    id: Number(id)
                }
            })
            const pessoaAtualizada = await dataBase.Pessoas.findOne({where: { id: Number(id)}})
            return res.status(200).json(pessoaAtualizada)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //Apaga Registro de Pessoa
    static async apagaPessoa(req, res){
        const { id } = req.params
        try {
            await dataBase.Pessoas.destroy({where: { id: Number(id) }})
            return res.status(200).json(`Registro ${id} Apagado com Sucesso`)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //Restaura Pessoa
    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await dataBase.Pessoas.restore({where: {id: Number(id)}})
            return res.status(200).json( { mensagem: `id ${id} restaurado`})
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //Métodos de Matrícula

    static async retornaUmaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try {
             const umaMatricula = await dataBase.Matriculas.findOne({
                 where: {
                     id: Number(matriculaId),
                     estudante_id: Number(estudanteId)
                 }
             })
             return res.status(200).json(umaMatricula)
         }
        catch (error) {
             return res.status(500).json(error.message)
        }
     }
     
     static async criaUmaMatricula(req, res){
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await dataBase.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        const novasInformacoes = req.body
        try {
            await dataBase.Matriculas.update(novasInformacoes, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)

                }
            })
            const matriculaAtualizada = await dataBase.Matriculas.findOne({where: { id: Number(matriculaId)}})
            return res.status(200).json(matriculaAtualizada)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async apagaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try {
            await dataBase.Matricula.destroy({where: { id: Number(matriculaId) }})
            return res.status(200).json(`Registro ${matriculaId} Apagado com Sucesso`)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } =  req.params
        try {
            await dataBase.Matriculas.restore({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async retornaMatricula(req, res){
        const { estudanteId } = req.params
        try {
            const pessoa = await dataBase.Pessoas.findOne({ where: {id: Number(estudanteId)}})
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async retornaMatriculaPorTurma(req, res){
        const { turmaId } = req.params
        try {
            const todasAsMatriculas = await dataBase.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId), 
                    status: 'confirmado', 
                    limit: 20, 
                    order: [['estudante_id', 'ASC']]}})
            return res.status(200).json(todasAsMatriculas)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async retornaTurmasLotadas(req, res){
        const lotacaoTurma = 2

        try {
            const turmasLotadas = await dataBase.Matriculas.findAndCountAll({
                 where: { status: 'confirmado'},
                 attributes: ['turma_id'],
                 group: ['turma_id'],
                 having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                })
            return res.status(200).json(turmasLotadas.count)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelaPessoa(req, res){
        const { estudanteId } = req.params

        try {
            dataBase.sequelize.transaction(async transacao => {
                await dataBase.Pessoas.update({ ativo: false },{ where: { id: Number(estudanteId) }}, {transaction: transacao})
                await dataBase.Matriculas.update({ status: 'cancelado' }, { where: { estudante_id: Number(estudanteId)}}, {transaction: transacao})
                return res.status(200).json({ message: `Matrículas estudante ${estudanteId} canceladas!`})
            })
            
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController