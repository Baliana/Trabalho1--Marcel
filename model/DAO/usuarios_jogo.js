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

module.exports = {
    insertUser
}