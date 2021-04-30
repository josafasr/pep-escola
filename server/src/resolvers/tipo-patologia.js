/**
 * @title Operações sobre a tabela de apresentações de tipo de patologia
 * @module src/resolvers/tipo-patologia
 * @author Marcos Porto, Josafá Santos dos Reis
 */

import { formatErrors } from '../format-errors'

export default {
  Query: {

    /**
     * retorna todos os registros de tipo de patologia
     */
    tiposPatologia: (_, __, { models }) => models.TipoPatologia.findAll(),

    /**
     * restorna um registro de tipo de patologia pelo id
     */
    tipoPatologia: (_, { id }, { models }) => models.TipoPatologia.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de tipo de patologia
     */
    createTipoPatologia: async (_, args, { models }) => {
      try {
        const tipoPatologia = await models.TipoPatologia.create(args)
        return {
          ok: true,
          tipoPatologia
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    /**
     * atualiza um registro de tipo de patologia, dado o id
     */
    updateTipoPatologia: (_, args, {models}) => models.TipoPatologia.update(args, {
        where: {
          id: args.id
        },
        returning: true,
        plain: true
      }).then((result) => { result[1] }),

    /**
     * exclui um registro de tipo de patologia, dado o id
     */
    deleteTipoPatologia: (_, { id }, { models }) => models.TipoPatologia.destroy({
      where: { id }
    })
  }
}