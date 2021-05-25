/**
 * @title Operações sobre a tabela de antecedentes patológicos
 * @module src/data/antecedente-patologico
 * @author Josafá Santos dos Reis
 */

import db from '../models'
import { formatErrors } from '../format-errors'

export default {
  create: async (args) => {
    try {
      const result = await db.sequelize.transaction(async (tx) => {
        const antecedentePatologico = await db.AntecedentePatologico.create(args)
        return antecedentePatologico
      })
      return {
        ok: true,
        antecedentePatologico: result
      }
    } catch (error) {
      return {
        ok: false,
        errors: formatErrors(error, db)
      }
    }
  },

  findByPaciente: async (pacienteId) => {
    try {
      const antecedentesPatologicos = await db.AntecedentePatologico.findAll({
        where: { pacienteId },
        include: {
          association: 'patologia',
          attributes: [ 'id', 'nome' ],
          include: {
            association: 'tipoPatologia',
            attributes: [ 'id', 'nome' ]
          }
        }
      })
      return antecedentesPatologicos
    } catch (error) {
      console.log(error)
    }
  }
}