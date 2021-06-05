/**
 * @description Operações sobre a tabela de atributos de antecedentes
 * @module src/data/antecedente-atributo
 * @author Josafá Santos dos Reis
 */

import db from '../models'
import { formatErrors } from '../format-errors'

export default {
  create: async (args) => {
    try {
      const result = await db.sequelize.transaction(async (tx) => {
        const antecedenteAtributo = await db.AntecedenteAtributo.create(args)
        return antecedenteAtributo
      })
      return {
        ok: true,
        antecedenteAtributo: result
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
      const antecedenteAtributos = await db.AntecedenteAtributo.findAll({
        include: {
          association: 'tipoAntecedente'
        }
      })
      return antecedenteAtributos
    } catch (error) {
      throw new Error(error)
    }
  },

  findByAntecedente: async (antecedenteId) => {
    try {
      const antecedenteAtributos = await db.AntecedenteAtributo.findAll({
        where: { antecedenteId },
        include: {
          association: 'tipoAntecedente'
        }
      })
      return antecedenteAtributos
    } catch (error) {
      throw new Error(error)
    }
  }
}