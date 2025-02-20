/***********************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD do jogo  
 * Data:13/02/2025
 * Autor: Fernando Baliana 
 * Versão: 1.0
 *************************************************************************************/

//import do arquivo de configuração para mesagem e status code
const   MESSAGE = require('../../module/config.js')

//import do DAO para realizar o CRUD no BD
const jogoDAO = require('../../model/DAO/jogo.js')

 // função para inserir um novo jogo
 const inserirJogo = async function(jogo){
    if(
        jogo.nome           == undefined       ||  jogo.nome == ''                ||jogo.nome == null                    ||jogo.nome.length > 80 ||
        jogo.data_lancamento == undefined       ||  jogo.data_lancamento == ''     ||jogo.data_lancamento == null         ||jogo.data_lancamento.length > 10 ||
        jogo.versao          == undefined       ||  jogo.versao == ''              ||jogo.versao == null                  ||jogo.versao.length > 10 ||
        jogo.tamanho         == undefined       ||jogo.tamanho.length > 10         ||
        jogo.descricao       == undefined       ||     
        jogo.foto_capa       == undefined       || jogo.foto_capa.length > 200     ||
        jogo.link            == undefined       || jogo.link.length > 200
    ){
        return  MESSAGE.ERRO_REQUIRED_FILES //400
    }else{

        //encamihar os dados do novo jogo para ser inserido no BD
        let resultjogo = await jogoDAO.insertJogo(jogo)

        if(resultjogo)
            return MESSAGE.SUCESS_CREATED_ITEM // 201
        else
            return MESSAGE.ERRO_INTERNAL_SERVER //500
    }

 }
 // função para atualizar um jogo
 const atualizarJogo = async function(){
    
 }

 // função para excluir um jogo
 const excluirJogo = async function(){

 }

 // função para retormar todos os jogos
 const listarJogo = async function(){

 }

 // função para buscar um jogo
 const buscarJogo = async function(){

 }

 module.exports ={
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
 }