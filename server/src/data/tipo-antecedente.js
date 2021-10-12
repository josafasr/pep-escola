/**
 * @description Operações sobre a tabela de tipos de antecedentes
 * @module src/data/tipo-antecedente
 * @author Josafá Santos dos Reis
 */

import { Op } from 'sequelize'

import db from '../models'
import { formatErrors } from '../format-errors'

export default {
  create: async (args) => {
    try {
      const result = await db.sequelize.transaction(async (tx) => {
        const tipoAntecedente = await db.TipoAntecedente.create(args)
        return tipoAntecedente
      })
      return {
        ok: true,
        tipoAntecedente: result
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
      const tiposAntecedentes = await db.TipoAntecedente.findAll()
      return tiposAntecedentes
    } catch (error) {
      console.log(error)
    }
  },

  findWithAssociations: async () => {
    try {
      const tiposAntecedentes = await db.TipoAntecedente.findAll({
        where: {
          id: { [Op.in]: [1, 6, 7, 8] }
        },
        order: [
          ['id'],
          ['antecedentes', 'id'],
          ['atributos', 'id']
        ],
        include: [
          { association: 'antecedentes' },
          { association: 'atributos' }
        ]
      })
      return tiposAntecedentes
    } catch (error) {
      throw new Error(error)
    }
  }
}