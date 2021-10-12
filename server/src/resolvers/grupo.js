/**
 * @description Operações sobre a tabela de grupos
 * @module src/resolvers/grupo
 * @author Josafá Santos dos Reis
 */

import { formatErrors } from "../format-errors"

export default {

  Query: {

    /**
     * retorna todos os registros de grupo
     */
    grupos: async (_, __, { models }) => await models.Grupo.findAll({
      include: [
        {
          as: 'permissoes',
          model: models.Permissao,
          through: { attributes: [] }
        }
      ]
    }),

    /**
     * restorna um registro de grupo pelo id
     */
    grupo: async (_, { id }, { models }) => await models.Grupo.findByPk(id, {
      include: [
        {
          as: 'usuarios',
          model: models.Usuario,
          through: { attributes: [] }
        }
      ]
    })
  },

  Mutation: {

    /**
     * cria um novo registro de grupo
     */
    createGrupo: async (_, args, { models, sequelize }) => {
      try {
        const result = await sequelize.transaction(async (tx) => {
          const grupo = await models.Grupo.create(args)
          return grupo
        })
        return {
          ok: true,
          grupo: result
        }
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error, models)
        }
      }
    },
    /**
     * atualiza um registro de grupo, dado o id
     */
    updateGrupo: async (_, { id, permissoes, ...rest }, { models, sequelize }) => {
      try {
        const result = await sequelize.transaction(async (tx) => {
          const grupo = await models.Grupo.findByPk(id)
          
          if (rest) {
            await grupo.update(rest, {
              returning: true,
              plain: true
            })
          }

          if (permissoes) {
            await grupo.setPermissoes(permissoes)
          }

          return grupo
        })
        return {
          ok: true,
          grupo: result
        }
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error, models)
        }
      }
    },

    /**
     * exclui exclui um registro de grupo, dado o id
     */
    deleteGrupo: (parent, { id }, { models }) => models.Grupo.destroy({
      where: {
        id
      }
    })
  }
}
