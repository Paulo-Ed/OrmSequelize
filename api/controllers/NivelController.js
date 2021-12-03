const dataBase = require('../models')

class NivelController {

    static async pegaTodosOsNiveis(req, res) {
      try {
        const todosOsNiveis = await dataBase.Niveis.findAll()
        return res.status(200).json(todosOsNiveis)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }
    //Retorna um Nível
    static async pegaUmNivel(req, res){
      const { id } = req.params
      try {
           const umNivel = await dataBase.Niveis.findOne({
               where: {
                   id: Number(id)
               }
           })
           return res.status(200).json(umNivel)
       }
      catch (error) {
           return res.status(500).json(error.message)
      }
   } 
   //Adiciona Nível
   static async criaNivel(req, res){
       const novoNivel = req.body
       try {
           const novoNivelCriado = await dataBase.Niveis.create(novoNivel)
           return res.status(200).json(novoNivelCriado)
       }
       catch (error) {
           return res.status(500).json(error.message)
       }
   }
   //Atualiza Nivel
   static async atualizaNivel(req, res){
       const { id } = req.params
       const novoNivel = req.body
       try {
           await dataBase.Niveis.update(novoNivel, {
               where: {
                   id: Number(id)
               }
           })
           const nivelAtualizado = await dataBase.Niveis.findOne({where: { id: Number(id)}})
           return res.status(200).json(nivelAtualizado)
       }
       catch (error) {
           return res.status(500).json(error.message)
       }
   }
   //Apaga Nivel
   static async apagaNivel(req, res){
       const { id } = req.params
       try {
           await dataBase.Niveis.destroy({where: { id: Number(id) }})
           return res.status(200).json(`Registro ${id} Apagado com Sucesso`)
       }
       catch (error) {
           return res.status(500).json(error.message)
       }
   }
}

module.exports = NivelController