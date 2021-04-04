/**
 * @title Operações sobre a tabela de avaliação de atendimento
 * @module src/resolvers/avaliacao-atendimento
 * @author Josafá Santos dos Reis
 */

import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de avaliação de atendimento
     */
    avaliacoesAtendimento: (_, args, { models }) => models.AvaliacaoAtendimento.findAll(),

    /**
     * restorna um registro de avaliação de atendimento, dado o id da consulta
     */
    avaliacaoAtendimento: (_, { consultaId }, { models }) => models.AvaliacaoAtendimento.findOne({
      where: { consultaId },
      include: [
        {
          association: 'avaliador',
          include: {
            association: 'pessoa',
            attributes: ['id', 'nome']
          }
        },
        {
          association: 'consulta',
          attributes: ['id', 'createdAt'],
          include: {
            association: 'paciente',
            attributes: ['id', 'prontuario'],
            include: {
              association: 'pessoa',
              attributes: ['id', 'nome']
            }
          }
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }),

    /**
     * restorna todos os registro de avaliação de atendimento, 
     * dado o id do avaliador
     */
    avaliacoesAtendimentoByAvaliador: (_, { usuarioId }, { models }) => models.AvaliacaoAtendimento.findAll({
      where: { usuarioId },
      include: [
        {
          association: 'avaliador',
          include: {
            association: 'pessoa',
            attributes: ['id', 'nome']
          }
        },
        {
          association: 'consulta',
          attributes: ['id', 'createdAt'],
          include: {
            association: 'paciente',
            attributes: ['id', 'prontuario'],
            include: {
              association: 'pessoa',
              attributes: ['id', 'nome']
            }
          }
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

  },

  Mutation: {

    /**
     * cria um novo registro de pessoa
     */
    createAvaliacaoAtendimento: async (_, args, { models, sequelize }) => {
      try {
        const result = await sequelize.transaction(async (tx) => {
          const avaliacaoAtendimento = await models.AvaliacaoAtendimento.create(args)
          return avaliacaoAtendimento
        })
        return {
          ok: true,
          avaliacaoAtendimento: result[1]
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    }
  }
}
