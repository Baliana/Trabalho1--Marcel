/* Objetivo: API referente ao projeto de controle de jogos
 *Data:17/02/2025
 * Autor: Fernando Baliana 
 * Versão: 1.0
*/

//Import do arquivo de configuração para mensagens e status code 
const MESSAGE = require('../../module/config.js')

//Import do DAO para realizar o CRUD no BD
const plataformaDAO = require('../../model/DAO/plataforma.js')

//Função para inserir um novo Plataforma
const inserirPlataforma = async function(Plataforma, contentType){
    try {

        if(contentType == 'application/json'){
        if
        (Plataforma.nome_plataforma == undefined   || Plataforma.nome_plataforma == ''   ||  Plataforma.nome_plataforma == null     || Plataforma.nome_plataforma.length  > 80  ||
            Plataforma.destinatario == undefined   || Plataforma.destinatario    == ''   ||  Plataforma.destinatario    == null     || Plataforma.destinatario.length     > 10  
        ){
            return MESSAGE.ERROR_REQUIRED_FILES      //400
        }else{
            //Encaminha os dados do novo Plataforma para ser inserido no BD
            let resultPlataforma = await plataformaDAODAO.inserirPlataforma(Plataforma)

            if(resultPlataforma)
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

//Função para atualizar uma Plataforma
const atualizarPlataforma = async function(Plataforma,id, contentType){
  try {
    if(contentType == 'application/json'){
        if
            (Plataforma.nome           == undefined   || Plataforma.nome            == ''   ||  Plataforma.nome            == null     || Plataforma.nome.length            > 80  ||
                Plataforma.data_lancamento == undefined   || Plataforma.data_lancamento == ''   ||  Plataforma.data_lancamento == null     || Plataforma.data_lancamento.length > 10  
         ){
            return MESSAGE.ERROR_REQUIRED_FILES      //400
        }else{
            //validar se o ID existe no banco de dados 
            let resultPlataforma= await buscarPlataforma(parseInt(id))

            if(resultPlataforma.status_code == 200){
                //update
                //adicio um atribudo ID no JSON para encaminhar o ide da requisição 
                Plataforma.id = parseInt(id)
                let result = await plataformaDAODAO.updatePlataforma(Plataforma)

                if(result){
                    return  MESSAGE.SUCESS_UPDATED_ITEM//200
                }else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }

            }else if (resultPlataforma.status_code == 404){
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

//Função para excluir um Plataforma
const excluirPlataforma = async function(id) {
    try {
  
      // Verifica se o ID foi passado corretamente
      if ( id == ''|| id == undefined || id == null|| isNaN(id) || id <=0) {
        return MESSAGE.ERROR_REQUIRED_FILES // 400 
      }else{
        let resultPlataforma = await buscarPlataforma(parseInt(id))
        if(resultPlataforma.status_code == 200){
            let result = await plataformaDAODAO.deletePlataforma(parseInt(id))

            if(result){
                return MESSAGE.SUCESS_DELET_ITEM // 200
            }else{
                MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else if(resultPlataforma.status_code == 404){
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
const listarPlataforma = async function(){
    try{
        let dadosPlataforma = {}

    //Chamo a função para retornar os dados do Plataforma
        let resultPlataforma = await plataformaDAO.selectAllPlataforma()

        if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){
        if(resultPlataforma.length > 0){

            //Cria um objeto do tipo JSON para retornar a lista de Plataforma 
            dadosPlataforma.status = true
            dadosPlataformas.status_code = 200
            dadosJPlataforma.items = resultPlataforma.length
            dadosPlataforma.games = resultPlataforma

            return dadosPlataforma//200
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

//Função para buscar um Plataforma
//buscar o id 
const buscarPlataforma = async function(id){
    try{
        let dadosPlataforma = {}

        if(id == undefined || id == '' || isNaN(id)){
            return MESSAGE.ERROR_REQUIRED_FILES //400
        }

        let resultPlataforma = await plataformaDAODAO.selectByIdPlataforma(id)

        //criar um objeto do tipo JSON para retornar a lista de Plataforma
            if(resultPlataforma){
                dadosPlataforma.status = true
                dadosPlataforma.status_code = 200
                dadosPlataforma.games = resultPlataforma
    
                return dadosPlataforma//200
            }else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        
    }catch(error){
         return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLLER//500
    }
}

module.exports = {
    inserirPlataforma,
    atualizarPlataforma,
    excluirPlataforma,
    listarPlataforma,
    buscarPlataforma
}