//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instancia do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no banco de dados um novo desenvolvedor
const insertDesenvolvedor = async function(desenvolvedor){
  try {

      let sql = `insert into tbl_desenvolvedor(
                                       data_fabricada,
                                       pais
                                      ) values (
                                      '${desenvolvedor.data_fabricada}',
                                      '${desenvolvedor.pais}'
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

//Função para atualizar no banco de dados um desenvolvedor existente 
const updateDesenvolvedor= async function(desenvolvedor){
 try{
    let sql = `update tbl_desenvolvedor set data_fabricada = '${desenvolvedor.data_fabricada}' ,
                                                pais = '${desenvolvedor.pais}'
                          where id = ${desenvolvedor.id}`

     let result = await prisma.$executeRawUnsafe(sql)
      if(result)
        return true
      else
      return false                      
 } catch (error){
    return false 
 }

}

//Função para excluir no banco de dados um desenvolvedor existente
const deleteDesenvolvedor = async function(id){
  try {
    //Deleta pelo ID
    let sql = 'DELETE FROM tbl_desenvolvedor WHERE id = '+id
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true 
    else
      return false 
    
  } catch (error) {
    return false
  }
  
}

//Função para retornar do banco de dados uma lista de desenvolvedor
const selectAllDesenvolvedor= async function(){
  try{
    //Script SQL para retornar os dados do BD
    let sql = 'select * from tbl_desenvolvedor order by id desc'

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

//Função para buscar no banco de dados um desenvolvedor pelo ID

const selectByIdDesenvolvedor = async function(id) {
  try {
      //buscar o id 
      let sql = `select * from tbl_desenvolvedor where id = ${id}`
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
    insertDesenvolvedor,
    updateDesenvolvedor,
    deleteDesenvolvedor,
    selectAllDesenvolvedor,
    selectByIdDesenvolvedor
}
