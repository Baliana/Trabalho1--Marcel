//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instancia do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no banco de dados um novo desenvolvedor
const insertDesenvolvedores = async function(desenvolvedores){
  
  
  try {
    
      let sql = `insert into tbl_desenvolvedores(
                                       data_fabricado,
                                       pais
                                      ) values (
                                      '${desenvolvedores.data_fabricado}',
                                      '${desenvolvedores.pais}'
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
const updateDesenvolvedor= async function(desenvolvedores){
 try{
    let sql = `update tbl_desenvolvedores set data_fabricado = '${desenvolvedores.data_fabricado}' ,
                                                pais = '${desenvolvedores.pais}'
                          where id_desenvolvedores = ${desenvolvedores.id}`

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
    let sql = 'DELETE FROM tbl_desenvolvedores WHERE id_desenvolvedores = '+id
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
    let sql = 'select * from tbl_desenvolvedores order by id_desenvolvedores desc'

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
      let sql = `select * from tbl_desenvolvedores where id_desenvolvedores = ${id}`
      console.log(sql);
      
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
  insertDesenvolvedores,
    updateDesenvolvedor,
    deleteDesenvolvedor,
    selectAllDesenvolvedor,
    selectByIdDesenvolvedor
}
