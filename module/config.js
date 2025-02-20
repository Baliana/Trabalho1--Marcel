/**********************************************************
 * Objetivo: arquivo de paronização de mesagens e status code para o projeto
 * Data:20/02/20025
 * Autor: Fernando 
 * Versão 1.0
 * ********************************************************/

/**************************MENSAGENS DE ERRO ***********************/

const ERRO_REQUIRED_FILES = {status: false, status_code: 400, message:
        'Existe, campos obrigatorios que não foram preenchidos ou ultrapassaram o limite de caracteres. A requisição não pode ser realizada'}
const ERRO_INTERNAL_SERVER = {status: false, status_code: 400, message: 
        'Não foi possivel processar a requisisão pois ocorreram erros internos no servidor'}
/****************************MENSAGEM DE SUCESSO **********************/
const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'item criado com sucesso '}
module.exports = {
    ERRO_REQUIRED_FILES,
    SUCESS_CREATED_ITEM,
    ERRO_INTERNAL_SERVER
}