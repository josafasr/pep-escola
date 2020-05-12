/**
 * @file Operações sobre a tabela de endereços
 * @module src/resolvers/endereco
 * @author Josafá Santos
 */

import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de endereço
     */
    enderecos: (parent, args, { models }) => models.Endereco.findAll(),

    /**
     * restorna um registro de endereço pelo id
     */
    endereco: (parent, { id }, { models }) => models.Endereco.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de endereço
     */
    createEndereco: async (parent, args, { models }) => {
      try {
        const endereco = await models.Endereco.create(args)
        return {
          ok: true,
          endereco
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    /**
     * atualiza um registro de endereço, dado o id
     */
    updateEndereco: async (parent, { id, ...otherArgs }, { models }) => {
      try {
        const result = await models.Endereco.update(...otherArgs, {
          where: { id },
          returning: true,
          plain: true
        })
        const endereco = result[1]
        return {
          ok: true,
          endereco
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    /**
     * exclui exclui um registro de endereço, dado o id
     */
    deleteEndereco: (parent, { id }, { models }) => models.Endereco.destroy({
      where: {
        id
      }
    })
  }
}
