/****************************************************************************************
 * Objetivo: API referente ao projeto de controle de jogos
 *Data:13/02/2025
 * Autor: Fernando Baliana 
 * Versão: 1.0
 * Observação:
 *  ******* para configurar e instalar a API, precisamos das seguintes bibliotecas:
 *              express     npm install express --save
 *              cors        npm install cors --save
 *              body-parser    npm install body-parser --save
 * 
 ********** para configurar e instalar o acesso ao Banco de Dados precisamos:
*         prisma      npm install prisma --save (conexão com o BD)
*         prisma/client   npm install @prisma/client --save (executa scripts no BD)

******** Para realizar o sincronismo do prisma com o BD, devemos executar o segunte comando:
        * npx prisma migrate dev
 ******************************************************************************************/

//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


//Import das controlles para realizar o CRUD de dados
const controllerJogo = require('./controller/jogo/controllerjogo.js')

//Estabelecendo formatos de dados que deverá chegar no body da requisição (POST ou PUT)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a API
const app = express()

app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')
        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        app.use(cors())
        next()
})

//EndPoint para inserir um jogo no BD
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async function(request, response){

        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do Body da requisição para a controller inserir no BD
        let resultJogo = await controllerJogo.inserirJogo(dadosBody, contentType)

        response.status(resultJogo.status_code)
        response.json(resultJogo)
})
//EndPoint para retornar uma lista de jogos
app.get('/v1/controle-jogos/jogo', cors(), async function (request, response) {
        //Chama a função para listar os jogos 
        let resultJogo = await controllerJogo.listarJogo()

        response.status(resultJogo.status_code)
        response.json(resultJogo)
})

//EndPoint para retornar  jogos atrves do id
app.get('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
        const id = request.params.id
        let resultJogo = await controllerJogo.buscarJogo(id)
    
        response.status(resultJogo.status_code);
        response.json(resultJogo)
})

//EndPoint para deletar um jogo 
app.delete('/v1/controle-jogos/jogo/delete/:id', cors(), async function (request, response){
        let id = request.params.id
        let resultJogo = await controllerJogo.excluirJogo(id)

        response.status(resultJogo.status_code)
        response.json(resultJogo)
})

app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJSON, async function(request, response) {
     //recebe o content-type da resquisição  
     let contentType = request.headers['content-type']

     //Recebe o ID do jogo
     let idJogo = request.params.id
     //recebe os dados do jogo encaminhado no body da requisição
     let dadosBody = request.body

     let resultJogo = await controllerJogo.atualizarJogo(dadosBody, idJogo, contentType)
     response.status (resultJogo.status_code)
     response.json(resultJogo)
})

//API usuarios

//Import das controlles para realizar o CRUD de dados
const controllerjogosUsuarios = require('./controller/usuarios_jogo/controllerjogosUsuarios.js')

//EndPoint para inserir um usuario no BD
app.post('/v1/controle-usuario/usuario', cors(), bodyParserJSON, async function(request, response){

        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do Body da requisição para a controller inserir no BD
        let resultUsuario = await controllerjogosUsuarios.inserirUsuarios(dadosBody, contentType)

        response.status(resultUsuario.status_code)
        response.json(resultUsuario)
})
//EndPoint para retornar uma lista de usuarios
app.get('/v1/controle-usuarios/usuarios', cors(), async function (request, response) {
        //Chama a função para listar os usuarios 
        let resultusuarios = await controllerjogosUsuarios.listarUsuario()

        response.status(resultusuarios.status_code)
        response.json(resultusuarios)
})

//EndPoint para retornar  jogos atrves do id
app.get('/v1/controle-usuario/usuario/:id', cors(), async function (request, response) {
        const id = request.params.id
        let resultusuarios = await controllerjogosUsuarios.buscarUsuario(id)
    
        response.status(resultusuarios.status_code);
        response.json(resultusuarios)
})
//EndPoint para deletar um jogo 
app.delete('/v1/controle-usuario/usuario/delete/:id', cors(), async function (request, response){
        let id = request.params.id
        let resultusuario = await controllerjogosUsuarios.excluirUsuario(id)

        response.status(resultusuario.status_code)
        response.json(resultusuario)
})

app.put('/v1/controle-usuario/usuario/:id', cors(), bodyParserJSON, async function(request, response) {
        //recebe o content-type da resquisição  
        let contentType = request.headers['content-type']
   
        //Recebe o ID do jogo
        let idusuario = request.params.id
        //recebe os dados do jogo encaminhado no body da requisição
        let dadosBody = request.body
   
        let resultusuario = await controllerjogosUsuarios.atualizarUsuario(dadosBody, idusuario, contentType)
        response.status (resultusuario.status_code)
        response.json(resultusuario)
   })


//api genero

//Import das controlles para realizar o CRUD de dados
const controllerGenero = require('./controller/genero_jogo/controllerGenero.js')

//EndPoint para inserir um usuario no BD
app.post('/v1/controle-genero/genero', cors(), bodyParserJSON, async function(request, response){

        let contentType = request.headers['content-type']
    //Recebe o conteúdo do body da requisição
        let dadosBody = request.body
        //Encaminhando os dados do Body da requisição para a controller inserir no BD
        let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)
    
        response.status(resultGenero.status_code)
        response.json(resultGenero)
})
    

//EndPoint para retornar uma lista de genero
app.get('/v1/controle-genero/genero', cors(), async function (request, response) {
        let resultGenero = await controllerGenero.listarGenero()
    
        response.status(resultGenero.status_code)
        response.json(resultGenero)
})
          
//EndPoint para retornar  genero atraves do id
app.get('/v1/controle-genero/genero/:id', cors(), async function (request, response) {
        let idGenero = request.params.id
    
        let resultGenero = await controllerGenero.buscarGenero(idGenero)
    
        response.status(resultGenero.status_code)
        response.json(resultGenero)
})

//EndPoint para deletar um genero 
app.delete('/v1/controle-genero/genero/delete/:id', cors(), async function (request, response) {
        let id = request.params.id 
      
        let resultGenero = await controllerGenero.excluirGenero(id)
      
        response.status(resultGenero.status_code)
        response.json(resultGenero)
})


app.put('/v1/controle-genero/genero/:id', cors(), bodyParserJSON, async function(request, response){

        //Recebe o content-type da requisição
        let contentType = request.headers['content-type']
        //Recebe o id do jogo 
        let idGenero = request.params.id 

        //Recebe os dados do jogo encaminhando no body da requisição
        let dadosBody = request.body

        let resultGenero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

        response.status(resultGenero.status_code)
        response.json(resultGenero)
})      


//api desenvolvedores

//Import das controlles para realizar o CRUD de dados
const controlllerDesenvolvedores = require('./controller/desenvolvedores/controlllerdesenvolvedores.js')

//EndPoint para inserir um desenvolvedores no BD
app.post('/v1/controle-desenvolvedores/desenvolvedores', cors(), bodyParserJSON, async function(request, response){

        let contentType = request.headers['content-type']
    //Recebe o conteúdo do body da requisição
        let dadosBody = request.body
        //Encaminhando os dados do Body da requisição para a controller inserir no BD
        let resultDesenvolvedores = await controlllerDesenvolvedores.inserirDesenvolvedores(dadosBody, contentType)
    
        response.status(resultDesenvolvedores.status_code)
        response.json(resultDesenvolvedores)
})

//EndPoint para retornar uma lista de desenvolvedores
app.get('/v1/controle-desenvolvedores/desenvolvedores', cors(), async function (request, response) {
        let resultDesenvolvedores = await controlllerDesenvolvedores.listarDesenvolvedores()
    
        response.status(resultDesenvolvedores.status_code)
        response.json(resultDesenvolvedores)
})
//EndPoint para retornar  desenvolvedores atraves do id
app.get('/v1/controle-desenvolvedores/desenvolvedores/:id', cors(), async function (request, response) {
        let idDesenvolvedores = request.params.id
    
        let resultDesenvolvedores = await controlllerDesenvolvedores.buscarDesenvolvedores(idDesenvolvedores)
        
    
        response.status(resultDesenvolvedores.status_code)
        response.json(resultDesenvolvedores)
})
    
//EndPoint para deletar um desenvolvedores 
app.delete('/v1/controle-desenvolvedores/desenvolvedores/delete/:id', cors(), async function (request, response) {
        let id = request.params.id 
      
        let resultDesenvolvedores = await controlllerDesenvolvedores.excluirDesenvolvedores(id)
      
        response.status(resultDesenvolvedores.status_code)
        response.json(resultDesenvolvedores)
})

app.put('/v1/controle-desenvolvedores/desenvolvedores/:id', cors(), bodyParserJSON, async function(request, response){

        //Recebe o content-type da requisição
        let contentType = request.headers['content-type']
        //Recebe o id do jogo 
        let idDesenvolvedores = request.params.id 

        //Recebe os dados do jogo encaminhando no body da requisição
        let dadosBody = request.body

        let resultDesenvolvedores = await controlllerDesenvolvedores.atualizarDesenvolvedores(dadosBody, idDesenvolvedores, contentType)

        response.status(resultDesenvolvedores.status_code)
        response.json(resultDesenvolvedores)
})  
app.listen(8088, function(){
        console.log('API aguardando requisições...')
})
