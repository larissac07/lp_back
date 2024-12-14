const express = require('express')
const cors = require ('cors')
const BodyBuilder = require('./src/bodybuilder/bodybuilder.entity')
const app = express()
app.use(cors())
const port = 3000
app.use(express.json())

var clientes = []

var academias = [
  { id: 1, nome: "Academia 1", telefone: "12345689"},
  {id: 2, nome: "Academia 2", telefone: "987654321"}
]

app.post('/body-builder', (req, res) =>{

    const data = req.body

    let bodyBuilder = new BodyBuilder(data.cpf, data.nome, data.celular, data.altura, data.cabelo, data.nomeGato, data.dataNascimento, null)

    clientes.push(bodyBuilder)
    res.send('cadastrou')
})

app.put('/body-builder/:cpf', (req, res) =>{
    let cpf = req.params.cpf
    for (let i = 0; i < clientes.length; i++){
      let cliente = clientes[i]
      if(cliente.cpf == cpf){
        const data = req.body
        let bodyBuilder = new BodyBuilder(data.cpf, data.nome, data.celular, data.altura, data.cabelo, data.nomeGato, data.dataNascimento, null)
        clientes[i] = bodyBuilder
        res.send('Atualizou')
      }
    }
    throw new Error('Cliente não encontrado')
})

app.delete('/body-builder/:cpf', (req, res) =>{
  let cpf = req.params.cpf
  for (let i = 0; i < clientes.length; i++){
    let cliente = clientes[i]
    if(cliente.cpf == cpf){
      clientes.splice(i, 1)
      res.send('Deletou')
    }
  }
  throw new Error('Cliente não encontrado')
  })
app.get('/body-builder', (req, res) => {
  res.json(clientes)
})


app.get("/gym", (req, res) => {
  res.json(academias)
}) 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})



