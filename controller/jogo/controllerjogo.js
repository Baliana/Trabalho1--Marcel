/***********************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD do jogo  
 * Data:13/02/2025
 * Autor: Fernando Baliana 
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de configuração para mensagens e status code 
const MESSAGE = require('../../module/config.js')

//Import do DAO para realizar o CRUD no BD
const jogoDAO = require('../../model/DAO/jogo.js')

//Função para inserir um novo jogo
const inserirJogo = async function(jogo, contentType){
    try {

        if(contentType == 'application/json'){
        if
        (jogo.nome           == undefined   || jogo.nome            == ''   ||  jogo.nome            == null     || jogo.nome.length            > 80  ||
        jogo.data_lancamento == undefined   || jogo.data_lancamento == ''   ||  jogo.data_lancamento == null     || jogo.data_lancamento.length > 10  ||
        jogo.versao          == undefined   || jogo.versao          == ''   ||  jogo.versao          == null     || jogo.versao.length          > 10  ||
        jogo.tamanho         == undefined   || jogo.tamanho.length  > 10    ||
        jogo.descricao       == undefined   ||
        jogo.foto_capa       == undefined   || jogo.foto_capa.length> 200   ||
        jogo.link            == undefined   || jogo.link.length     > 200   
        ){
            return MESSAGE.ERROR_REQUIRED_FILES      //400
        }else{
            //Encaminha os dados do novo jogo para ser inserido no BD
            let resultJogo = await jogoDAO.insertJogo(jogo)

            if(resultJogo)
                return MESSAGE.SUCESS_CREATED_ITEM   //201
            else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
            }
        }else {
            return MESSAGE.ERROR_CONTENT_TYPE//415
        }
    } catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para atualizar um jogo
const atualizarJogo = async function(jogo,id, contentType){
  try {
    if(contentType == 'application/json'){
        if
            (jogo.nome           == undefined   || jogo.nome            == ''   ||  jogo.nome            == null     || jogo.nome.length            > 80  ||
            jogo.data_lancamento == undefined   || jogo.data_lancamento == ''   ||  jogo.data_lancamento == null     || jogo.data_lancamento.length > 10  ||
            jogo.tamanho         == undefined   || jogo.tamanho.length  > 10    ||
            jogo.descricao       == undefined   ||
            jogo.foto_capa       == undefined   || jogo.foto_capa.length> 200   ||
            jogo.link            == undefined   || jogo.link.length     > 200   ||
            id                   == undefined   || id                    ==''   ||  id         ==null      || isNaN(id)            || id<=0
         ){
            return MESSAGE.ERROR_REQUIRED_FILES      //400
        }else{
            //validar se o ID existe no banco de dados 
            let resultJogo = await buscarJogo(parseInt(id))

            if(resultJogo.status_code == 200){
                //update
                //adicio um atribudo ID no JSON para encaminhar o ide da requisição 
                jogo.id = parseInt(id)
                let result = await jogoDAO.updateJogo(jogo)

                if(result){
                    return  MESSAGE.SUCESS_UPDATED_ITEM//200
                }else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }

            }else if (resultJogo.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
            }
        }
    }else{
        return MESSAGE.ERROR_CONTENT_TYPE //415
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    
  }
}

//Função para excluir um jogo
const excluirJogo = async function(id) {
    try {
  
      // Verifica se o ID foi passado corretamente
      if ( id == ''|| id == undefined || id == null|| isNaN(id) || id <=0) {
        return MESSAGE.ERROR_REQUIRED_FILES // 400 
      }else{
        let resultJogo = await buscarJogo(parseInt(id))
        if(resultJogo.status_code == 200){
            let result = await jogoDAO.deleteJogo(parseInt(id))

            if(result){
                return MESSAGE.SUCESS_DELET_ITEM // 200
            }else{
                MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else if(resultJogo.status_code == 404){
            return MESSAGE.ERROR_NOT_FOUND //404
        }else{
            return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLLER //500
        }
      }
    }catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
       

   


//Função para retornar todos os jogos
const listarJogo = async function(){
    try{
        let dadosJogos = {}

    //Chamo a função para retornar os dados do jogo
        let resultJogo = await jogoDAO.selectAllJogo()

        if(resultJogo != false || typeof(resultJogo) == 'object'){
        if(resultJogo.length > 0){

            //Cria um objeto do tipo JSON para retornar a lista de jogos 
            dadosJogos.status = true
            dadosJogos.status_code = 200
            dadosJogos.items = resultJogo.length
            dadosJogos.games = resultJogo

            return dadosJogos//200
        }else {
            return MESSAGE.ERROR_NOT_FOUND //404
        }
    }else{
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
    }
        } catch (error) {
         return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }    
}

//Função para buscar um jogo

//buscar o id 
const buscarJogo = async function(id){
    try{
        let dadosJogos = {}

        if(id == undefined || id == '' || isNaN(id)){
            return MESSAGE.ERROR_REQUIRED_FILES //400
        }

        let resultJogo = await jogoDAO.selectByIdJogo(id)

        //criar um objeto do tipo JSON para retornar a lista de jogos
            if(resultJogo){
                dadosJogos.status = true
                dadosJogos.status_code = 200
                dadosJogos.games = resultJogo
    
                return dadosJogos//200
            }else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        
    }catch(error){
         return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLLER//500
    }
}

module.exports = {
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
}
