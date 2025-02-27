/**********************************************************
 * Objetivo: arquivo de paronização de mesagens e status code para o projeto
 * Data:20/02/20025
 * Autor: Fernando 
 * Versão 1.0
 * ********************************************************/

/**************************MENSAGENS DE ERRO ***********************/

const ERRO_REQUIRED_FILES = {status: false, status_code: 400, message:
        'Existe, campos obrigatorios que não foram preenchidos ou ultrapassaram o limite de caracteres. A requisição não pode ser realizada'}
const ERRO_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 
        'Não foi possivel processar a requisisão pois ocorreram erros internos no servidor do CONTROLER'}
const ERRO_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 
        'Não foi possivel processar a requisisão pois ocorreram erros internos no servidor do  MODEL'}
const ERRO_CONTENT_TYPE =  {status: false, status_code: 500, message:' não foi possivel processar a requisição pois o formato de dado encaminhado não é suportado pelo servidor.Favor encaminhar apenas json!'}
/****************************MENSAGEM DE SUCESSO **********************/
const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'item criado com sucesso '}
module.exports = {
    ERRO_REQUIRED_FILES,
    ERRO_INTERNAL_SERVER_CONTROLLER,
    ERRO_INTERNAL_SERVER_MODEL,
    ERRO_CONTENT_TYPE,
    SUCESS_CREATED_ITEM
}