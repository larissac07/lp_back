const express = require('express')
const cors = require ('cors')
const BodyBuilder = require('./src/bodybuilder/bodybuilder.entity')
const app = express()
app.use(cors())
const port = 3000
app.use(express.json())

var clientes = []

var estilos = [
  { id: 1, nome: "Monstrão"},
  {id: 2, nome: "Frango"}
]

app.post('/body-builder', (req, res) =>{

    const data = req.body

    const idEstilo = data.idEstilo
    const style = estilos.find((estilo) => estilo.id == idEstilo)

    let bodyBuilder = new BodyBuilder(data.cpf, data.nome, data.celular, data.altura, data.cabelo, data.nomeGato, data.dataNascimento, style)

    clientes.push(bodyBuilder)
    res.send('cadastrou')
})

app.put('/body-builder/:cpf', (req, res) =>{
    let cpf = req.params.cpf
    for (let i = 0; i < clientes.length; i++){
      let cliente = clientes[i]
      if(cliente.cpf == cpf){
        const data = req.body

        const idEstilo = data.idEstilo
        const style = estilos.find((estilo) => estilo.id == idEstilo)
        let bodyBuilder = new BodyBuilder(data.cpf, data.nome, data.celular, data.altura, data.cabelo, data.nomeGato, data.dataNascimento, style)
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


app.get("/style", (req, res) => {
  res.json(estilos)
}) 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})



