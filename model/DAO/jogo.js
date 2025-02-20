/***********************************************************************************
 * Objetivo: model responsavel pelo CRUD de dados referentesa jogos no banco de dados
 * Data:13/02/2025
 * Autor: Fernando Baliana 
 * Versão: 1.0
 *************************************************************************************/

 // faça o impote da biblioteca do prisma client para executar scripts do Banco de dados
const{ PrismaClient} = require('@prisma/client')

 //função para inserir no banco de dados um novo jogo
 const insertJogo = async function(jogo){
     //instancia da classe do prisma client para gerar um jogo 
    const prisma = new PrismaClient()
    

    let sql = `insert into tbl_jogo(

                                    nome,
                                    data_lancamento,
                                    versao,
                                    tamanho,
                                    descricao,
                                    foto_capa,
                                    link
                                    )values(
                                        '${jogo.nome}',
                                        '${jogo.data_lancamento}',
                                        '${jogo.versao}',
                                        '${jogo.tamanho}',
                                        '${jogo. foto_capa}',
                                        '${jogo.link}'

                                    )`;
   //executa o script do banco de dados e AGUARDE O RETORNO DO BANCO    
  let result = await prisma.$executeRawUnsafe(sql)

   if(result)
       return true
    else 
    return false 

 }
// função para atualizar no banco de dados um jogo existente
 const updateJogo = async function(){

 }

 //função para excluir no banco de dados um jogo exixstente
 const deleteJogo = async function(){

 }

 //função para retomar do banco de dados uma lista de jogos 
 const selecALLJogo = async function(){

 }

 //função para buscar no banco de dados um jogo pelo ID
 const selectByIdJogo = async function(){

}

module.exports={
    insertJogo,
    updateJogo,
    deleteJogo,
    selecALLJogo,
    selectByIdJogo
}