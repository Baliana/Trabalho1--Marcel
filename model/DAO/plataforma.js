//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instancia do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no banco de dados um novo Plataforma
const insertPlataforma = async function(Plataforma){
  try {

      let sql = `insert into tbl_plataforma(
                                      nome_plataforma,
                                      destinatario
                                      ) values (
                                      '${Plataforma.nome_plataforma}',
                                      '${Plataforma.destinatario}'
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

//Função para atualizar no banco de dados um Plataforma existente 
const updatePlataforma = async function(Plataforma){
 try{
    let sql = `update tbl_plataforma set   nome_plataforma = '${Plataforma.nome_plataforma}' ,
                                                  destinatario = '${Plataforma.destinatario}' 
                          where id = ${Plataforma.id}`

     let result = await prisma.$executeRawUnsafe(sql)
      if(result)
        return true
      else
      return false                      
 } catch (error){
    return false 
 }

}

//Função para excluir no banco de dados um Plataforma existente
const deletePlataforma = async function(id){
  try {
    //Deleta pelo ID
    let sql = 'DELETE FROM tbl_plataforma WHERE id = '+id
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true 
    else
      return false 
    
  } catch (error) {
    return false
  } 
}

//Função para retornar do banco de dados uma lista de Plataforma
const selectAllPlataforma = async function(){
  try{
    //Script SQL para retornar os dados do BD
    let sql = 'select * from tbl_plataforma order by id desc'

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

//Função para buscar no banco de dados um Plataforma pelo ID
const selectByIdPlataforma = async function(id) {
  try {
      //buscar o id 
      let sql = `select * from tbl_plataforma where id = ${id}`
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

module.exports ={
  insertPlataforma,
  updatePlataforma,
  deletePlataforma,
  selectAllPlataforma,
  selectByIdPlataforma
}