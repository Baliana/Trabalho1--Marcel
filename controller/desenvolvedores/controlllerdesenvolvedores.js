/***********************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD do jogo  
 * Data:13/02/2025
 * Autor: Fernando Baliana 
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de configuração para mensagens e status code 
const MESSAGE = require('../../module/config.js')

//Import do DAO para realizar o CRUD no BD
const desenvolvedoresDAO = require('../../model/DAO/desenvolvedores.js')

//Função para inserir um novo jogo
const inserirDesenvolvedores = async function(desenvolvedores, contentType){
    try {
        
        if(contentType == 'application/json'){
        if
        (desenvolvedores.data_fabricado == undefined   || desenvolvedores.data_fabricado == ''   ||  desenvolvedores.data_fabricado == null     || desenvolvedores.data_fabricado.length > 80  ||
        desenvolvedores.pais            == undefined   || desenvolvedores.pais           == ''   ||  desenvolvedores.pais           == null     || desenvolvedores.pais.length           > 10  
        ){
            return MESSAGE.ERROR_REQUIRED_FILES      //400
        }else{
            //Encaminha os dados do novo desenvolvedores para ser inserido no BD
            let resultdesenvolvedores = await desenvolvedoresDAO.insertDesenvolvedores(desenvolvedores)

            if(resultdesenvolvedores)
                return MESSAGE.SUCESS_CREATED_ITEM   //201
            else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
            }
        }else {
            return MESSAGE.ERROR_CONTENT_TYPE//415
        }
    } catch(error){
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para atualizar um desenvolvedores
const atualizarDesenvolvedores = async function(desenvolvedores,id, contentType){
  try {
    
    if(contentType == 'application/json'){
        if
            (desenvolvedores.data_fabricado           == undefined   || desenvolvedores.data_fabricado            == ''   ||  desenvolvedores.data_fabricado            == null     || desenvolvedores.data_fabricado.length            > 80  ||
                desenvolvedores.pais == undefined   || desenvolvedores.pais == ''   ||  desenvolvedores.pais == null     || desenvolvedores.pais.length > 10  
          ){
            return MESSAGE.ERROR_REQUIRED_FILES      //400
        }else{
            //validar se o ID existe no banco de dados 
            let resultdesenvolvedores = await desenvolvedoresDAO.selectByIdDesenvolvedor(parseInt(id))
    
            
            if(resultdesenvolvedores.status_code == 200){
                //update
                //adicio um atribudo ID no JSON para encaminhar o id da requisição 
                desenvolvedores.id = parseInt(id)
                let result = await desenvolvedoresDAO.updateDesenvolvedor(desenvolvedores)

                if(result){
                    return  MESSAGE.SUCESS_UPDATED_ITEM//200
                }else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if (resultdesenvolvedores.status_code == 404){
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

//Função para excluir um desenvolvedores
const excluirDesenvolvedores = async function(id) {
    try {
  
      // Verifica se o ID foi passado corretamente
      if ( id == ''|| id == undefined || id == null|| isNaN(id) || id <=0){
        return MESSAGE.ERROR_REQUIRED_FILES // 400 
      }else{
              let resultDesenvolvedores = await buscarDesenvolvedores(parseInt(id))
              if(resultDesenvolvedores.status_code == 200){
                  let result = await desenvolvedoresDAO.deleteDesenvolvedor(parseInt(id))
      
                  if(result){
                      return MESSAGE.SUCESS_DELET_ITEM // 200
                  }else{
                      MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                  }
              }else if(resultDesenvolvedores.status_code == 404){
                  return MESSAGE.ERROR_NOT_FOUND //404
              }else{
                  return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLLER //500
              }
            }
          }catch (error){
              return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
          }
      }

//Função para retornar todos os desenvolvedores
const listarDesenvolvedores = async function(){
    try{
        let dadosdesenvolvedores = {}

    //Chamo a função para retornar os dados do desenvolvedores
        let resultdesenvolvedores = await desenvolvedoresDAO.selectAllDesenvolvedor()

        if(resultdesenvolvedores != false || typeof(resultdesenvolvedores) == 'object'){
        if(resultdesenvolvedores.length > 0){

            //Cria um objeto do tipo JSON para retornar a lista de desenvolvedores 
            dadosdesenvolvedores.status = true
            dadosdesenvolvedores.status_code = 200
            dadosdesenvolvedores.items = resultdesenvolvedores.length
            dadosdesenvolvedores.games = resultdesenvolvedores

            return dadosdesenvolvedores//200
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

//Função para buscar um desenvolvedores
//buscar o id 
const buscarDesenvolvedores = async function(id){
    try{
        let dadosdesenvolvedores = {}

        if(id == undefined || id == '' || isNaN(id)){
            return MESSAGE.ERROR_REQUIRED_FILES //400
        }

        let resultdesenvolvedores = await desenvolvedoresDAO.selectByIdDesenvolvedor(id)
        

        //criar um objeto do tipo JSON para retornar a lista de desenvolvedores
            if(resultdesenvolvedores){
                dadosdesenvolvedores.status = true
                dadosdesenvolvedores.status_code = 200
                dadosdesenvolvedores.games = resultdesenvolvedores
    
                return dadosdesenvolvedores//200
            }else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        
    }catch(error){
         return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

module.exports = {
    inserirDesenvolvedores,
    atualizarDesenvolvedores,
    excluirDesenvolvedores,
    listarDesenvolvedores,
    buscarDesenvolvedores
}