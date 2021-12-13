const dataBase = require('../models')

class Services {
    constructor(nomeModelo){
        this.nomeModelo = nomeModelo
    }

    async pegaTodosOsRegistros() {
        return dataBase[this.nomeModelo].findAll()
    }

    async pegaUmRegistro(id) {

    }

    async criaRegistro(dados) {

    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return dataBase[this.nomeModelo].update(dadosAtualizados, { where: {id: id}}, transacao)
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {} ) {
        return dataBase[this.nomeModelo].update(dadosAtualizados, { where: { ...where } }, transacao)
    }

    async apagaRegistro(dados) {
        
    }
}

module.exports = Services