const express = require("express") //Inicia o express
const router = express.Router() //Configura a primeira parte da rota
const cors = require('cors')//Traz o pacote Cors que permite consumir essa api no Frontend

const conectaBancoDeDados = require('./bancoDeDados')//ligando ao arquivo bancoDeDados
conectaBancoDeDados()//chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //Inicia o app
app.use(express.json())
app.use(cors())

const porta = 3333 // Cria a porta


//GET
async function mostraMulheres(request, response) {
  try {
    const mulheresVindaDoBancoDeDados = await Mulher.find()

    response.json(mulheresVindaDoBancoDeDados)
  }catch(erro){
    console.log(erro)
  }
   
}

//POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({

    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao
  })
  try{
    const mulherCriada = await novaMulher.save()
    response.status(201).json(mulherCriada)

  }catch(erro){
    console.log(erro)
  }
   
}

//PATCH
async function corrigeMulher(request, response) {

  try {
    const mulherEncontrada= await Mulher.findById(request.params.id)

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome 
    }
  
    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio 
    }
  
    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem
    }

    if (request.body.citacao) {
      mulherEncontrada = request.body.citacao
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

    response.json(mulherAtualizadaNoBancoDeDados)

}catch(erro){
    console.log(erro)
  }
}

//DELETE
async function deletaMulher(request, response) {
  try{
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({messagem: 'Mulher deletada com sucesso'})

  }catch(erro){
    console.log(erro)

  }
}


app.use(router.get('/mulheres', mostraMulheres)) // Configurei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) // Configurei rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //Configurei a rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //Configurei a rota DELETE /mulheres


//PORTA
function mostraPorta() {
    console.log("Servidor rodando na porta", porta)
}

app.listen(porta, mostraPorta) //Servidor ouvindo a porta

