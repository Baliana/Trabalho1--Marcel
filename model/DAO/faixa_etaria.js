const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Inserir nova faixa etária
const insertFaixaEtaria = async function(faixa) {
    try {
        let sql = `INSERT INTO tbl_faixa_etaria (
                        categoria,
                        descricao,
                        tbl_jogos_id
                   ) VALUES (
                        '${faixa.categoria}',
                        '${faixa.descricao}',
                        ${faixa.tbl_jogos_id}
                   )`

        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Atualizar faixa etária existente
const updateFaixaEtaria = async function(faixa) {
    try {
        let sql = `UPDATE tbl_faixa_etaria SET 
                        categoria = '${faixa.categoria}',
                        descricao = '${faixa.descricao}',
                        tbl_jogos_id = ${faixa.tbl_jogos_id}
                   WHERE id_faixa_etaria = ${faixa.id}`
        
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Excluir faixa etária por ID
const deleteFaixaEtaria = async function(id) {
    try {
        let sql = `DELETE FROM tbl_faixa_etaria WHERE id_faixa_etaria = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Selecionar todas as faixas etárias
const selectAllFaixaEtaria = async function() {
    try {
        let sql = `SELECT * FROM tbl_faixa_etaria ORDER BY id_faixa_etaria DESC`
        let result = await prisma.$queryRawUnsafe(sql)
        return result ? result : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Buscar faixa etária por ID
const selectByIdFaixaEtaria = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_faixa_etaria WHERE id_faixa_etaria = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result : false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertFaixaEtaria,
    updateFaixaEtaria,
    deleteFaixaEtaria,
    selectAllFaixaEtaria,
    selectByIdFaixaEtaria
}
