/**
 * @description Operações sobre a tabela de religioes
 * @module src/data/religiao
 * @author Josafá Santos dos Reis
 */

import { Op } from 'sequelize'

import db from '../models'
import { formatErrors } from '../format-errors'

export default {
  create: async (args) => {
    try {
      const result = await db.sequelize.transaction(async (tx) => {
        const religiao = await db.Religiao.create(args)
        return religiao
      })
      return {
        ok: true,
        religiao: result
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
      const religioes = await db.Religiao.findAll()
      return religioes
    } catch (error) {
      console.log(error)
    }
  },

  findByText: async (text) => {
    try {
      const religioes = await db.Religiao.findAll({
        where: {
          nome: { [Op.like]: `${text}%` },
        }
      })
      return religioes
    } catch (error) {
      throw new Error(error.message)
    }
  }
}