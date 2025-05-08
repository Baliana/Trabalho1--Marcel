//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instancia do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no banco de dados uma nova versao
const insertVersao = async function(versao){
    try {

        let sql = `insert into tbl_versao(
                                        tipo_versao,
                                        '${versao.tipo_versao}'
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

//Função para atualizar no banco de dados um versao existente 
const updateVersao = async function(versao){
 try{
    let sql = `update tbl_versao set   tipo_versao  = '${versao.tipo_versao}'  
                          where id = ${versao.id}`

     let result = await prisma.$executeRawUnsafe(sql)
      if(result)
        return true
      else
      return false                      
 } catch (error){
    return false 
 }

}

//Função para excluir no banco de dados um versao existente
const deleteVersao = async function(id){
  try {
    //Deleta pelo ID
    let sql = 'DELETE FROM tbl_versao WHERE id = '+id
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true 
    else
      return false 
    
  } catch (error) {
    return false
  }
  
}

//Função para retornar do banco de dados uma lista de Versao
const selectAllVersao = async function(){
  try{
    //Script SQL para retornar os dados do BD
    let sql = 'select * from tbl_versao order by id desc'

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
const selectByIdVersao = async function(id) {
  try {
      //buscar o id 
      let sql = `select * from tbl_versao where id = ${id}`
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
    insertVersao,
    updateVersao,
    deleteVersao,
    selectAllVersao,
    selectByIdVersao
}