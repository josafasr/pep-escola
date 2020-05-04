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
    recordatoriosAlimentar: (parent, args, { models }) => models.Contato.findAll(),

    /**
     * retorna um registro de recordatorio alimentar pelo id
     */
    recordatorioAlimentar: (parent, { id }, { models }) => models.Contato.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de recordatorio alimentar
     */
    createRecordatorioAlimentar: async (parent, args, { models }) => {
      try {
        const recordatorioAlimentar = await models.RecordatorioAlimentar.create({
          nome: args.nome,
          tipoRefeicaoId: args.tipoRefeicaoId,
        })
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
      const result = await models.Contato.update({
        nome: args.nome,
        tipoRefeicaoId: args.tipoRefeicaoId,
        updatedAt: new Date(),
      }, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      const RecordatorioAlimentar = result[1]
      return RecordatorioAlimentar
    },

    /**
     * exclui um registro de Recordatorio alimentar, dado o id
     */
    deleteContato: (parent, { id }, { models }) => models.RecordatorioAlimentar.destroy({
      where: {
        id
      }
    })
  }
}
