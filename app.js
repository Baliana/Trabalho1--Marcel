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

//import das bibliotecas paa criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const ControllerJogo = require('./controller/jogo/controllerjogo.js')


//estabelecendo o formato de dados que devera chegar no body da requisição(post ou put)
const bodyParserJSON = bodyParser.json()
//Criar o objetivo app para criar a API
const app = express()

app.use ((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', ' GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

//EndPoint para inserir um jogo no BD
app.post('/v1/controle-jogos/jogo', cors(),bodyParserJSON, async function(resquest, response){
    
    //recebe o conteudo do body da requisição
    let dadosBody = resquest.dody
    //encaminhar os dados do body da requisição para a controller inserir no BD
    let resultjogo = await ControllerJogo.inserirJogo(dadosBody)

    response.status(resultjogo.status_code)
    response.json(resultjogo)

})

app.listen(8080, function(){
    console.log('API aguardando requisições...')
})