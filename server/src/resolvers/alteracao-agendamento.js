/**
 * @file Operações sobre a tabela de alteração de agendamento
 * @module src/resolvers/agendamento
 * @author Marcos Porto
 */

import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de alteração de agendamento 
     */
    alteracaoAgendamentos: (parent, args, { models }) => models.AlteracaoAgendamento.findAll(),

    /**
     * retorna um registro de alteração de agendamento pelo id
     */
    alteracaoAgendamento: (parent, { id }, { models }) => models.AlteracaoAgendamento.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de alteração de agendamento
     */
    createAlteracaoAgendamento: async (parent, args, { models }) => {
      try {
        const alteracaoAgendamento = await models.AlteracaoAgendamento.create({
            data_hora_anterior: args.data_hora_anterior,
            data_hora_proxima: args.data_hora_proxima,
            motivo: args.motivo,
            agendamentoId: args.agendamentoId,
            usuarioId: args.usuarioId,
            createdAt: new Date(),
        })
        return {
          ok: true,
          alteracaoAgendamento
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
          }
      }
      
    },

    /**
     * atualiza um registro de alteração de agendamento, dado o id
     */
    updateAlteracaoAgendamento: async (parent, args, { models }) => {
      const result = await models.AlteracaoAgendamento.update({
        data_hora_anterior: args.data_hora_anterior,
        data_hora_proxima: args.data_hora_proxima,
        motivo: args.motivo,
        agendamentoId: args.agendamentoId,
        usuarioId: args.usuarioId,
        updatedAt: new Date(),
      }, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      const alteracaoAgendamento = result[1]
      return alteracaoAgendamento
    },

    /**
     * exclui um registro de alteração de agendamento, dado o id
     */
    deleteAlteracaoAgendamento: (parent, { id }, { models }) => models.AlteracaoAgendamento.destroy({
      where: {
        id
      }
    })
  }
}