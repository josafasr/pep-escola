/**
 * @description Operações sobre a tabela de unidades de saude
 * @module src/data/unidade-saude
 * @author Josafá Santos dos Reis
 */

import { Op } from 'sequelize'

import db from '../models'
import { formatErrors } from '../format-errors'

export default {
  create: async (args) => {
    try {
      const result = await db.sequelize.transaction(async (tx) => {
        const unidadeSaude = await db.UnidadeSaude.create(args)
        return unidadeSaude
      })
      return {
        ok: true,
        unidadeSaude: result
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
      const unidadesSaude = await db.UnidadeSaude.findAll()
      return unidadesSaude
    } catch (error) {
      console.log(error)
    }
  },

  findByText: async (text) => {
    try {
      const unidadesSaude = await db.UnidadeSaude.findAll({
        where: {
          nome: { [Op.like]: `${text}%` },
        }
      })
      return unidadesSaude
    } catch (error) {
      throw new Error(error.message)
    }
  }
}