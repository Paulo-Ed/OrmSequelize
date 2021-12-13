const Services = require('./Services')
const dataBase = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }

    async pegaRegistrosAtivos(where = {}) {
        return dataBase[this.nomeModelo].findAll( { whre: {...where}})
    }

    async pegaTodosOsRegistros(where = {}) {
        return dataBase[this.nomeModelo].scope('todos').findAll({ where: { ...where}})
    }

    async cancelaPessoaEMatriculas(estudanteId){
        return dataBase.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ ativo: false}, estudanteId, { transaction: transacao})
            await this.matriculas.atualizaRegistros({ status: 'cancelado'}, {estudante_id: estudanteId}, { transaction: transacao})
        })
    }

}

module.exports = PessoasServices