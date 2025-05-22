/***********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD da faixa etária  
 * Data: 22/05/2025
 * Autor: Fernando Baliana
 * Versão: 1.0
 *************************************************************************************/

// Import do arquivo de configuração para mensagens e status code
const MESSAGE = require('../../module/config.js')

// Import do DAO para realizar o CRUD no BD
const faixa_etariaDAO = require('../../model/DAO/faixa_etaria.js')

// Função para inserir uma nova faixa etária
const inserirFaixaEtaria = async function(faixa, contentType) {
    try {
        if (contentType === 'application/json') {
            if (
                faixa.categoria == undefined || faixa.categoria == '' || faixa.categoria == null || faixa.categoria.length > 45 ||
                faixa.descricao == undefined || faixa.descricao == '' || faixa.descricao == null ||
                faixa.tbl_jogos_id == undefined || faixa.tbl_jogos_id == '' || faixa.tbl_jogos_id == null || isNaN(faixa.tbl_jogos_id)
            ) {
                return MESSAGE.ERROR_REQUIRED_FILES // 400
            } else {
                let result = await faixa_etariaDAO.insertFaixaEtaria(faixa)
                return result ? MESSAGE.SUCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 201 / 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para atualizar uma faixa etária
const atualizarFaixaEtaria = async function(faixa, id, contentType) {
    try {
        if (contentType === 'application/json') {
            if (
                faixa.categoria == undefined || faixa.categoria == '' || faixa.categoria == null || faixa.categoria.length > 45 ||
                faixa.descricao == undefined || faixa.descricao == '' || faixa.descricao == null ||
                faixa.tbl_jogos_id == undefined || faixa.tbl_jogos_id == '' || faixa.tbl_jogos_id == null || isNaN(faixa.tbl_jogos_id)
            ) {
                return MESSAGE.ERROR_REQUIRED_FILES // 400
            } else {
                let faixaExistente = await faixa_etariaDAO.selectByIdFaixaEtaria(parseInt(id))
                if (faixaExistente) {
                    faixa.id = parseInt(id)
                    let result = await faixa_etariaDAO.updateFaixaEtaria(faixa)
                    return result ? MESSAGE.SUCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 200 / 500
                } else {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para excluir uma faixa etária
const excluirFaixaEtaria = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FILES // 400
        } else {
            let faixaExistente = await buscarFaixaEtaria(parseInt(id))
            if (faixaExistente.status_code === 200) {
                let result = await faixa_etariaDAO.deleteFaixaEtaria(parseInt(id))
                return result ? MESSAGE.SUCESS_DELET_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 200 / 500
            } else {
                return faixaExistente // 404 ou 500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para listar todas as faixas etárias
const listarFaixaEtaria = async function() {
    try {
        let dados = {}
        let result = await faixa_etariaDAO.selectAllFaixaEtaria()

        if (result && result.length > 0) {
            dados.status = true
            dados.status_code = 200
            dados.items = result.length
            dados.faixa_etaria = result
            return dados
        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para buscar faixa etária por ID
const buscarFaixaEtaria = async function(id) {
    try {
        let dados = {}

        if (id == undefined || id == '' || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRED_FILES // 400
        }

        let result = await faixa_etariaDAO.selectByIdFaixaEtaria(id)

        if (result) {
            dados.status = true
            dados.status_code = 200
            dados.faixa_etaria = result
            return dados
        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirFaixaEtaria,
    atualizarFaixaEtaria,
    excluirFaixaEtaria,
    listarFaixaEtaria,
    buscarFaixaEtaria
}
