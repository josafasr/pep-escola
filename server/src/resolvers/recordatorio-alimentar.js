/**
 * @file Operações sobre a tabela de recordatorio alimentar
 * @module src/resolvers/recordatorio-alimentar
 * @author Marcos Porto
 */

import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de recordatorio alimentar
     */
    recordatoriosAlimentar: (parent, args, { models }) => models.RecordatorioAlimentar.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }),

    /**
     * retorna um registro de recordatorio alimentar pelo id
     */
    recordatorioAlimentar: (parent, { id }, { models }) => models.RecordatorioAlimentar.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
  },

  Mutation: {

    /**
     * cria um novo registro de recordatorio alimentar
     */
    createRecordatorioAlimentar: async (parent, args, { models }) => {
      try {
        const recordatorioAlimentar = await models.RecordatorioAlimentar.create(args)
        return {
          ok: true,
          recordatorioAlimentar
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
          }
      }
    },

    /**
     * atualiza um registro de contato, dado o id
     */
    updateRecordatorioAlimentar: async (parent, args, { models }) => {
      const result = await models.RecordatorioAlimentar.update(args, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      const recordatorioAlimentar = result[1]
      return recordatorioAlimentar
    },

    /**
     * exclui um registro de Recordatorio alimentar, dado o id
     */
    deleteRecordatorioAlimentar: (parent, { id }, { models }) => models.RecordatorioAlimentar.destroy({
      where: {
        id
      }
    })
  }
}
