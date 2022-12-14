/**
 * @file Operações sobre a tabela de agendamento
 * @module src/resolvers/agendamento
 * @author Marcos Porto
 */

import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de agendamento
     */
    agendamentos: (parent, args, { models }) => models.Agendamento.findAll(),

    /**
     * retorna um registro de agendamento pelo id
     */
    agendamento: (parent, { id }, { models }) => models.Agendamento.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de Agendamento
     */
    createAgendamento: async (parent, args, { models }) => {
      try {
        const agendamento = await models.Agendamento.create({
            insercao: args.insercao,
            retorno: args.retorno,
            ambulatorio: args.ambulatorio,
            data_horario: args.data_horario,
            confirmado: args.confirmado,
            status: args.status,
            cancelado: args.cancelado,
            pacienteId: args.pacienteId,
            usuarioId: args.usuarioId,
        })
        return {
          ok: true,
          agendamento
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
          }
      }
      
    },

    /**
     * atualiza um registro de Agendamento, dado o id
     */
    updateAgendamento: async (parent, args, { models }) => {
      const result = await models.Agendamento.update({
        insercao: args.insercao,
        retorno: args.retorno,
        ambulatorio: args.ambulatorio,
        data_horario: args.data_horario,
        confirmado: args.confirmado,
        status: args.status,
        cancelado: args.cancelado,
        pacienteId: args.pacienteId,
        usuarioId: args.usuarioId,
        updatedAt: new Date(),
      }, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      const agendamento = result[1]
      return agendamento
    },

    /**
     * exclui um registro de Agendamento, dado o id
     */
    deleteAgendamento: (parent, { id }, { models }) => models.Agendamento.destroy({
      where: {
        id
      }
    })
  }
}