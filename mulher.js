const express = require("express") 
const router = express.Router()
 
const app = express()
const porta = 3333

function mostraPorta() {
    console.log("Servidor rodando na porta", porta)
}

function mostraMulher(request, response) {
    response.json({
        nome: 'Thainá Rodrigues',
        imagem: 'https://media.licdn.com/dms/image/v2/C5603AQHuc-ZOZX8c5g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1630939006699?e=1732147200&v=beta&t=jEfh_YvmlLVBgQiOY2wNlkwwyzElm9BbjlOhNvRHFSk',
        minibio: 'Desenvolvedora'
    })
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)