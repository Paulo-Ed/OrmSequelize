const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

//Retorna as pessoas ativas
router.get('/pessoas', PessoaController.retornaPessoasAtivas)

//Retorna as pessoas 
router.get('/pessoas/todos', PessoaController.retornaTodasAsPessoas)

//Retorna uma pessoa com o id informado
router.get('/pessoas/:id', PessoaController.retornaUmaPessoa)

//Retorna as matriculas de uma pessoa
router.get('/pessoas/:estudanteId/matricula', PessoaController.retornaMatricula)

//Adiciona uma nova pessoa
router.post('/pessoas', PessoaController.criaPessoa)

//Atualiza o registro de uma pessoa
router.put('/pessoas/:id', PessoaController.atualizaPessoa)

//Deleta o registro de uma pessoa
router.delete('/pessoas/:id', PessoaController.apagaPessoa)
module.exports = router

//Restaura o registro de uma pessoa
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)

//Rotas Matrícula
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.retornaUmaMatricula)
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.retornaMatriculaPorTurma)
router.get('/pessoas/matricula/lotada', PessoaController.retornaTurmasLotadas)
router.post('/pessoas/:estudanteId/matricula/', PessoaController.criaUmaMatricula)
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)

