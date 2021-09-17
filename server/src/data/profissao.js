/**
 * @description Operações sobre a tabela de profissoes
 * @module src/data/profissao
 * @author Josafá Santos dos Reis
 */

import { Op } from 'sequelize'

import db from '../models'
import { formatErrors } from '../format-errors'

export default {
  create: async (args) => {
    try {
      const result = await db.sequelize.transaction(async (tx) => {
        const profissao = await db.Profissao.create(args)
        return profissao
      })
      return {
        ok: true,
        profissao: result
      }
    } catch (error) {
      return {
        ok: false,
        errors: formatErrors(error, db)
      }
    }
  },

  findAll: async () => {
    try {
      const profissoes = await db.Profissao.findAll()
      return profissoes
    } catch (error) {
      console.log(error)
    }
  },

  findByText: async (text) => {
    try {
      const profissoes = await db.Profissao.findAll({
        where: {
          nome: { [Op.like]: `${text}%` },
        }
      })
      return profissoes
    } catch (error) {
      throw new Error(error.message)
    }
  }
}