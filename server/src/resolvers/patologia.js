/**
 * @title Operações sobre a tabela de patologias
 * @module src/resolvers/patologia
 * @author Marcos Porto, Josafá Santos dos Reis
 */

import { formatErrors } from '../format-errors'

export default {

  Query: {

    /**
     * retorna todos os registros de patologia
     */
    patologias: (_, __, { models }) => models.Patologia.findAll({
      attributes: [ 'id', 'nome', 'descricao' ],
      include: {
        association: 'tipoPatologia',
        attributes: [ 'id', 'nome', 'descricao' ]
      }
    }),

    /**
     * retorna um registro de patologia pelo id
     */
    patologia: (_, { id }, { models }) => models.Patologia.findByPk(id, {
      attributes: [ 'id', 'nome', 'descricao' ],
      include: {
        association: 'tipoPatologia',
        attributes: [ 'id', 'nome', 'descricao' ]
      }
    })
  },

  Mutation: {
    // cria uma nova Patologia
    createPatologia: async (_, args, { models }) => {
      try {
        const patologia = await models.Patologia.create(args)
        return {
          ok: true,
          patologia
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    // atualiza dados da Patologia
    updatePatologia: (_, args, {models}) => models.Patologia.update(args, {
      where: {
          id: args.id
      },
      returning: true,
      plain: true
    }).then(result => result[1]),

    // exclui a Patologia
    deletePatologia: (_, { id }, { models }) => models.Patologia.destroy({
      where: { id }
    })    
  }
}