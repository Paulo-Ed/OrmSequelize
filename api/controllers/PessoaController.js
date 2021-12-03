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
}

module.exports = PessoaController