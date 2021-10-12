/**
 * @description Operações sobre a tabela de permissoes
 * @module src/resolvers/permissao
 * @author Josafá Santos dos Reis
 */

import { formatErrors } from "../format-errors"

export default {

  Query: {

    /**
     * retorna todos os registros de permissao
     */
    permissoes: async (_, __, { models }) => {
      const permissoes = await models.Permissao.findAll()
      return permissoes
    },

    /**
     * restorna um registro de permissao pelo id
     */
    permissao: async (_, { id }, { models }) => await models.Permissao.findByPk(id, {
      include: [
        {
          as: 'grupos',
          model: models.Permissao,
          through: { attributes: [] }
        }
      ]
    })
  },

  Mutation: {

    /**
     * cria um novo registro de permissao
     */
    createPermissao: async (_, args, { models, sequelize }) => {
      try {
        const result = await sequelize.transaction(async (tx) => {
          const permissao = await models.Permissao.create(args)
          return permissao
        })
        return {
          ok: true,
          permissao: result
        }
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error, models)
        }
      }
    },
    /**
     * atualiza um registro de permissao, dado o id
     */
    updatePermissao: (_, args, { models }) => models.Permissao.update({
      nome: args.nome,
      updatedAt: new Date(),
    }, {
      where: { id: args.id },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    /**
     * exclui exclui um registro de permissao, dado o id
     */
    deletePermissao: (_, { id }, { models }) => models.Permissao.destroy({
      where: {
        id
      }
    })
  }
}
