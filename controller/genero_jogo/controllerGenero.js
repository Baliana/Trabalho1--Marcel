/* Objetivo: API referente ao projeto de controle de jogos
 *Data:17/02/2025
 * Autor: Fernando Baliana 
 * Versão: 1.0
*/
//Import do arquivo de configuração para mensagens e status code 
const MESSAGE = require('../../module/config.js')

//Import do DAO para realizar o CRUD no BD
const GeneroDAO = require('../../model/DAO/genero.js')

const inserirGenero = async function(Genero,contentType ) {
    try{
        if(contentType == 'application/json'){
            if
            (Genero.nome     == undefined || Genero .nome      == '' || Genero.nome      == null  || Genero.nome.length > 80  ||
            Genero.descricao == undefined || Genero .descricao == '' || Genero.descricao == null  || Genero.descricao.length > 80  
        ){
            return MESSAGE.ERROR_REQUIRED_FILES      //400
        }else{
            //Encaminha os dados do novo usuario para ser inserido no BD
            let resultGenero  = await GeneroDAO.inserirGenero(Genero )
            
            if(resultGenero )
                return MESSAGE.SUCESS_CREATED_ITEM   //201
            else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
        }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE//415
        }
    }catch(error){
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }
}

//Função para atualizar um Genêro
const atualizarGenero = async function(Genero,id, contentType){
  try {
    if(contentType == 'application/json'){
        if
            (Genero.nome     == undefined  || Genero.nome      == '' ||  Genero.nome      == null  || Genero.nome.length  > 80  ||
            Genero.descricao == undefined  || Genero.descricao == '' ||  Genero.descricao == null  || Genero.descricao .length > 10  
         ){
            return MESSAGE.ERROR_REQUIRED_FILES      //400
        }else{
            //validar se o ID existe no banco de dados 
            let resultGenero  = await buscarGenero(parseInt(id))

            if(resultGenero.status_code == 200){
                //adicio um atribudo ID no JSON para encaminhar o ide da requisição 
                Genero.id = parseInt(id)
                let result = await GeneroDAO.updateGenero(Genero)

                if(result){
                    return  MESSAGE.SUCESS_UPDATED_ITEM//200
                }else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }

            }else if (resultGenero.status_code == 404){
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
//Função para excluir um Genero
const excluirGenero = async function(id) {
    try {
  
      // Verifica se o ID foi passado corretamente
      if ( id == ''|| id == undefined || id == null|| isNaN(id) || id <=0) {
        return MESSAGE.ERROR_REQUIRED_FILES // 400 
      }else{
        let resultGenero = await buscarGenero(parseInt(id))
        if(resultGenero.status_code == 200){
            let result = await GeneroDAO.deleteGenero(parseInt(id))

            if(result){
                return MESSAGE.SUCESS_DELET_ITEM // 200
            }else{
                MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else if(resultGenero.status_code == 404){
            return MESSAGE.ERROR_NOT_FOUND //404
        }else{
            return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLLER //500
        }
      }
    }catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//Função para retornar todos os Genero
const listarGenero = async function(){
    try{
        let dadosGenero = {}

    //Chamo a função para retornar os dados do Genero
        let resultGenero = await GeneroDAO.selectAllGenero()

        if(resultGenero != false || typeof(resultGenero) == 'object'){
        if(resultGenero.length > 0){

            //Cria um objeto do tipo JSON para retornar a lista de Genero 
            dadosGenero.status = true
            dadosGenero.status_code = 200
            dadosGenero.items = resultGenero.length
            dadosGenero.games = resultGenero

            return dadosGenero//200
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
//buscar o id 
const buscarGenero = async function(id){
    try{
        let dadosGenero = {}

        if(id == undefined || id == '' || isNaN(id)){
            return MESSAGE.ERROR_REQUIRED_FILES //400
        }

        let resultGenero = await GeneroDAO.selectByIdGenero(id)

        //criar um objeto do tipo JSON para retornar a lista de Genero
            if(resultGenero){
                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.games = resultGenero
    
                return dadosGenero//200
            }else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        
    }catch(error){
         return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLLER//500
    }
}
module.exports ={
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
}