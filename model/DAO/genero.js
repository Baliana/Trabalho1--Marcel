//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instancia do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//função para inserir no banco um novo Genero
const insertGenero= async function(Genero){
    try{
        let sql = `insert into tbl_genero(
                                            nome,
                                            genero_descricao
                                            )value (
                                            '${Genero.nome}',
                                             ${Genero.genero_descricao}'
                                            )`

        let result = await prisma.$executeRawUnsafe(sql)
                                           
        if(result)
          return true
        else 
          return false
    }catch (error){
        //console.log(error)
        return false
    }   
}

//Função para atualizar no banco de dados um Genero existente 
const updateGenero = async function(Genero){
    try{
       let sql = `update tbl_genero set   nome   = '${Genero.nome}' ,
                                         genero_descricao = '${Genero.genero_descricao}',
                             where id = ${Genero.id}`
   
        let result = await prisma.$executeRawUnsafe(sql)
         if(result)
           return true
         else
         return false                      
    } catch (error){
       return false 
    }
   
   }
   
   //Função para excluir no banco de dados um Genero existente
   const deleteGenero = async function(id){
     try {
       //Deleta pelo ID
       let sql = 'DELETE FROM tbl_genero WHERE id = '+id
       let result = await prisma.$executeRawUnsafe(sql)
   
       if (result)
         return true 
       else
         return false 
       
     } catch (error) {
       return false
     }
     
   }
   
   //Função para retornar do banco de dados uma lista de Genero
   const selectAllGenero = async function(){
     try{
       //Script SQL para retornar os dados do BD
       let sql = 'select * from tbl_genero order by id desc'
   
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
   
   //Função para buscar no banco de dados um Genero pelo ID
   
   const selectByIdGenero = async function(id) {
     try {
         //buscar o id 
         let sql = `select * from tbl_genero where id = ${id}`
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
  insertGenero,
  updateGenero,
  deleteGenero,
  selectAllGenero,
  selectByIdGenero
}