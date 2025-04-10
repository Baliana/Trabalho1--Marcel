//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instancia do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//função para inserir no banco um novo user
const insertUser = async function(user){
    try{
        let sql = `insert into tbl_usuarios(
                                            nome,
                                            email,
                                            senha
                                            )value (
                                            '${user.nome}',
                                             ${user.email}',
                                            '${user.senha}'
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

//Função para atualizar no banco de dados um usuario existente 
const updateUsuario = async function(Usuario){
    try{
       let sql = `update tbl_jogo set   nome   = '${jogo.nome}' ,
                                         email = '${jogo.email}',
                                         senha = '${jogo.senha}',
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
   
   //Função para excluir no banco de dados um Usuario existente
   const deleteUsuario = async function(id){
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
   
   //Função para retornar do banco de dados uma lista de Usuario
   const selectAllUsuario = async function(){
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
   
   //Função para buscar no banco de dados um Usuario pelo ID
   
   const selectByIdUsuario = async function(id) {
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
    
}