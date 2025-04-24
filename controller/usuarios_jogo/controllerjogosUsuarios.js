/* Objetivo: API referente ao projeto de controle de jogos
 *Data:10/02/2025
 * Autor: Fernando Baliana 
 * Versão: 1.0
*/
//Import do arquivo de configuração para mensagens e status code 
const MESSAGE = require('../../module/config.js')

//Import do DAO para realizar o CRUD no BD
const UsuarioDAO = require('../../model/DAO/usuarios.js')

//função para inserir um novo usuario
const inserirUsuarios = async function(Usuario, contentType){
    try {

        if(contentType == 'application/json'){
        if
        (Usuario.nome  == undefined || Usuario.nome  == '' || Usuario.nome   == null  || Usuario.nome.length > 80  ||
         Usuario.email == undefined || Usuario.email == '' || Usuario.email  == null  || Usuario.email.length > 80  ||
         Usuario.senha == undefined || Usuario.senha == '' || Usuario.senha  == null  || Usuario.senha.length > 80  
        ){
            return MESSAGE.ERROR_REQUIRED_FILES      //400
        }else{
            //Encaminha os dados do novo usuario para ser inserido no BD
            let resultUsuario = await UsuarioDAO.insertUser(Usuario)

            if(resultUsuario)
                return MESSAGE.SUCESS_CREATED_ITEM   //201
            else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
            }
        }else {
            return MESSAGE.ERROR_CONTENT_TYPE//415
        }
    } catch(error){
        console.log(error);
        
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para atualizar um usuario
const atualizarUsuario = async function(Usuario,id, contentType){
  try {
    if(contentType == 'application/json'){
        if
            (
            Usuario.nome    == undefined  || Usuario.nome   == '' ||  Usuario.nome  == null  || Usuario.nome.length  > 80  ||
             Usuario.email   == undefined  || Usuario.email  == '' ||  Usuario.email == null  || Usuario.email.length > 45  ||
             Usuario.senha   == undefined  || Usuario.senha  == '' || Usuario.senha  == null  || Usuario.nome.length > 25  
           
         ){
            return MESSAGE.ERROR_REQUIRED_FILES      //400
        }else{
            //validar se o ID existe no banco de dados 
            let resultUsuario = await buscarUsuario(parseInt(id))

            if(resultUsuario.status_code == 200){
                //adicio um atribudo ID no JSON para encaminhar o ide da requisição 
                Usuario.id = parseInt(id)
                let result = await UsuarioDAO.updateUsuario(Usuario)

                if(result){
                    return  MESSAGE.SUCESS_UPDATED_ITEM//200
                }else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }

            }else if (resultUsuario.status_code == 404){
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

//Função para excluir um Usuario
const excluirUsuario = async function(id) {
    try {
  
      // Verifica se o ID foi passado corretamente
      if ( id == ''|| id == undefined || id == null|| isNaN(id) || id <=0) {
        return MESSAGE.ERROR_REQUIRED_FILES // 400 
      }else{
        let resultUsuario = await buscarUsuario(parseInt(id))
        if(resultUsuario.status_code == 200){
            let result = await UsuarioDAO.deleteUsuario(parseInt(id))

            if(result){
                return MESSAGE.SUCESS_DELET_ITEM // 200
            }else{
                MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else if(resultUsuario.status_code == 404){
            return MESSAGE.ERROR_NOT_FOUND //404
        }else{
            return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLLER //500
        }
      }
    }catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar todos os Usuario
const listarUsuario = async function(){
    try{
        let dadosUsuario = {}

    //Chamo a função para retornar os dados do Usuario
        let resultUsuario = await UsuarioDAO.selectAllUsuario()

        if(resultUsuario != false || typeof(resultUsuario) == 'object'){
        if(resultUsuario.length > 0){

            //Cria um objeto do tipo JSON para retornar a lista de Usuario 
            dadosUsuario.status = true
            dadosUsuario.status_code = 200
            dadosUsuario.items = resultUsuario.length
            dadosUsuario.games = resultUsuario

            return dadosUsuario//200
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

//Função para buscar um Usuario
//buscar o id 
const buscarUsuario = async function(id){
    try{
        let dadosUsuario = {}

        if(id == undefined || id == '' || isNaN(id)){
            return MESSAGE.ERROR_REQUIRED_FILES //400
        }

        let resultUsuario = await UsuarioDAO.selectByIdUsuario(id)

        //criar um objeto do tipo JSON para retornar a lista de Usuario
            if(resultUsuario){
                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.games = resultUsuario
    
                return dadosUsuario//200
            }else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        
    }catch(error){
         return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLLER//500
    }
}
module.exports = {
    inserirUsuarios,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}