//Importando o express para iniciar o servidor local
const express = require('express')
const bodyParser = require('body-parser')

//Inicializando o servidor
const app = express()

app.use(bodyParser.json())

//Definindo porta
const port = 3000

//Criando rota inicial
app.get('/teste', (req, res) => res.status(200).send({mensagem: 'Bem vindo a Api'}))

//Definindo conexão com o servidor
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))


