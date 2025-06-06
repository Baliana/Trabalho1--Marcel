//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instancia do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no banco de dados um novo jogo
const insertJogo = async function(jogo){
  try {

      let sql = `insert into tbl_jogo(
                                      nome,
                                      id_faixa_etaria,
                                      data_lancamento,
                                      tamanho,
                                      descricao,
                                      foto_capa,
                                      link
                                      ) values (
                                      '${jogo.nome}',
                                      '${jogo.id_faixa_etaria}',
                                      '${jogo.data_lancamento}',
                                      '${jogo.tamanho}',
                                      '${jogo.descricao}',
                                      '${jogo.foto_capa}',
                                      '${jogo.link}'
                                      )`
      //Executa o script SQL no BD e Aguarda o retorno do BD                                
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
        return true
      else 
        return false 
  } catch (error){
    //console.log(error)
    return false
  }                                  
}

//Função para atualizar no banco de dados um jogo existente 
const updateJogo = async function(jogo){
 try{
    let sql = `update tbl_jogo set   nome             = '${jogo.nome}' ,
                                      id_faixa_etaria = '${jogo.id_faixa_etaria}',
                                      data_lancamento = '${jogo.data_lancamento}',
                                      tamanho         = '${jogo.tamanho}',
                                      descricao       = '${jogo.descricao}',
                                      foto_capa       = '${jogo.foto_capa}',
                                      link            = '${jogo.link}'  
                          where id = ${jogo.id}`

     let result = await prisma.$executeRawUnsafe(sql)
      if(result)
        return true
      else
      return false                      
 } catch (error){
    return false 
 }

}

//Função para excluir no banco de dados um jogo existente
const deleteJogo = async function(id){
  try {
    //Deleta pelo ID
    let sql = 'DELETE FROM tbl_jogo WHERE id = '+id
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true 
    else
      return false 
    
  } catch (error) {
    return false
  }
  
}

//Função para retornar do banco de dados uma lista de jogos
const selectAllJogo = async function(){
  try{
    //Script SQL para retornar os dados do BD
    let sql = 'select * from tbl_jogo order by id desc'

    //Executa o Script SQL e aguarda o retorno dos dados
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
      return result
    else 
      return false

  } catch (error) {
      return false 
  }
}

//Função para buscar no banco de dados um jogo pelo ID

const selectByIdJogo = async function(id) {
  try {
      //buscar o id 
      let sql = `select * from tbl_jogo where id = ${id}`
      //Executa o Script SQL e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if (result.length > 0) {
          return result
      } else {
          return false
      }
  } catch (error) {
      return false
  }
}

module.exports = {
  insertJogo,
  updateJogo,
  deleteJogo,
  selectAllJogo,
  selectByIdJogo
}