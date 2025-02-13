/***********************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD do jogo  
 * Data:13/02/2025
 * Autor: Fernando Baliana 
 * Versão: 1.0
 *************************************************************************************/

 // função para inserir um novo jogo
 const inserirJogo = async function(jogo){
    if(
        jogo.nome            == undefined       ||  jogo.nome == ''                ||jogo.nome == null                    ||jogo.nome.length > 80 ||
        jogo.data_lancamento == undefined       ||  jogo.data_lancamento == ''     ||jogo.data_lancamento == null         ||jogo.data_lancamento.length > 80 ||
        jogo.versao          == undefined       ||  jogo.versao == ''              ||jogo.versao == null                  ||jogo.versao.length > 80 ||
        jogo.tamanho         == undefined       ||jogo.tamanho.length > 80 ||
        jogo.descricao       == undefined ||     
        jogo.foto_capa       == undefined       || jogo.foto_capa.length > 80 ||
        jogo.link            == undefined       || jogo.link.length > 80
    )  
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
