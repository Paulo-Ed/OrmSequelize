const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

//Retorna todas as pessoas
router.get('/pessoas', PessoaController.retornaTodasAsPessoas)

//Retorna uma pessoa com o id informado
router.get('/pessoas/:id', PessoaController.retornaUmaPessoa)

//Adiciona uma nova pessoa
router.post('/pessoas', PessoaController.criaPessoa)

//Atualiza o registro de uma pessoa
router.put('/pessoas/:id', PessoaController.atualizaPessoa)

//Deleta o registro de uma pessoa
router.delete('/pessoas/:id', PessoaController.apagaPessoa)
module.exports = router

//Rotas Matrícula
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.retornaUmaMatricula)
router.post('/pessoas/:estudanteId/matricula/', PessoaController.criaUmaMatricula)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)