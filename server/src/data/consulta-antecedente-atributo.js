/* eslint-disable no-unused-vars */
/**
 * @description Operações sobre a tabela de valores de atributos de antecedentes
 * @module src/data/consulta-antecedente-atributo
 * @author Josafá Santos dos Reis
 */

import db from '../models'
import { formatErrors } from '../format-errors'

export default {
  create: async (args) => {
    try {
      const result = await db.sequelize.transaction(async (tx) => {
        const consultaAntecedenteAtributo = await db.ConsultaAntecedenteAtributo.create(args)
        return consultaAntecedenteAtributo
      })
      return {
        ok: true,
        consultaAntecedenteAtributo: result
      }
    } catch (error) {
      return {
        ok: false,
        errors: formatErrors(error, db)
      }
    }
  },

  bulkCreate: async (consultaAntecedenteAtributosArray) => {
    try {
      const result = await db.sequelize.transaction(async (tx) => {
        const consultaAntecedenteAtributos = await db.ConsultaAntecedenteAtributo.bulkCreate(consultaAntecedenteAtributosArray)
        return consultaAntecedenteAtributos
      })
      return {
        ok: true,
        consultaAntecedenteAtributos: result
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
      const consultaAntecedenteAtributos = await db.ConsultaAntecedenteAtributo.findAll({
        include: {
          association: 'tipoAntecedente'
        }
      })
      return consultaAntecedenteAtributos
    } catch (error) {
      throw new Error(error)
    }
  },

  findByConsulta: async (consultaId) => {
    try {
      const consultaAntecedenteAtributos = await db.ConsultaAntecedenteAtributo.findAll({
        where: { consultaId },
        include: [
          { association: 'antecedente' },
          { association: 'antecedenteAtributo' }
        ]
      })
      return consultaAntecedenteAtributos
    } catch (error) {
      throw new Error(error)
    }
  }
}