/**
 * @description Operações sobre a tabela de valores de atributos de antecedentes
 * @module src/data/paciente-antecedente-atributo
 * @author Josafá Santos dos Reis
 */

import db from '../models'
import { formatErrors } from '../format-errors'

export default {
  create: async (args) => {
    try {
      const result = await db.sequelize.transaction(async (tx) => {
        const pacienteAntecedenteAtributo = await db.PacienteAntecedenteAtributo.create(args)
        return pacienteAntecedenteAtributo
      })
      return {
        ok: true,
        pacienteAntecedenteAtributo: result
      }
    } catch (error) {
      return {
        ok: false,
        errors: formatErrors(error, db)
      }
    }
  },

  bulkCreate: async (pacienteAntecedenteAtributosArray) => {
    try {
      const result = await db.sequelize.transaction(async (tx) => {
        const pacienteAntecedenteAtributos = await db.PacienteAntecedenteAtributo.bulkCreate(pacienteAntecedenteAtributosArray)
        return pacienteAntecedenteAtributos
      })
      return {
        ok: true,
        pacienteAntecedenteAtributos: result
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
      const pacienteAntecedenteAtributos = await db.PacienteAntecedenteAtributo.findAll({
        include: {
          association: 'tipoAntecedente'
        }
      })
      return pacienteAntecedenteAtributos
    } catch (error) {
      throw new Error(error)
    }
  },

  findByPaciente: async (pacienteId) => {
    try {
      const pacienteAntecedenteAtributos = await db.PacienteAntecedenteAtributo.findAll({
        where: { pacienteId },
        include: [
          { association: 'antecedente' },
          { association: 'antecedenteAtributo' }
        ]
      })
      return pacienteAntecedenteAtributos
    } catch (error) {
      throw new Error(error)
    }
  }
}