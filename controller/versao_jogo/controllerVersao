/***********************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD do jogo  
 * Data:13/02/2025
 * Autor: Fernando Baliana 
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de configuração para mensagens e status code 
const MESSAGE = require('../../module/config.js')

//Import do DAO para realizar o CRUD no BD
const jogoDAO = require('../../model/DAO/Versao.js')

//Função para inserir um novo Versao
const inserirVersao = async function(Versao, contentType){
    try {

        if(contentType == 'application/json'){
        if
        (jogo.nome           == undefined   || jogo.nome            == ''   ||  jogo.nome            == null     || jogo.nome.length            > 80  ||
        jogo.data_lancamento == undefined   || jogo.data_lancamento == ''   ||  jogo.data_lancamento == null     || jogo.data_lancamento.length > 10  ||
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
