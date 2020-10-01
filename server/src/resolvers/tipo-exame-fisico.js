/**
 * @title Operações sobre a tabela de apresentações de tipos de exame físico
 * @module src/resolvers/tipo-exame-fisico
 * @author Josafá Santos dos Reis
 */

import { formatErrors } from '../format-errors';

export default {
  Query: {

    /**
    * retorna todos os registros de tipo de exame fisico
    */
    tiposExameFisico: async (_, args, { models }) => {
      const tiposExameFisico = await models.TipoExameFisico.findAll()
      return tiposExameFisico
    },

    /**
    * retorna um registro de tipo de exame fisico pelo id
    */
    tipoExameFisico: async (_, { id }, { models }) => {
      const tipoExameFisico = await models.TipoExameFisico.findByPk(id)
      return tipoExameFisico
    }
  },

    Mutation: {

    /**
     * cria um novo registro de tipo de exame fisico
     */
    createTipoExameFisico: async (_, args, { models }) => {
      try {
        const tipoExameFisico = await models.TipoExameFisico.create(args)
        return {
          ok: true,
          tipoExameFisico
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
      
    },

    /**
     * atualiza um registro de tipo de exame fisico, dado o id
     */
    updateTipoExameFisico: async (_, args, { models }) => {
      const result = await models.TipoExameFisico.update({
        nome: args.nome,
        updatedAt: new Date(),
      }, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      const TipoExameFisico = result[1]
      return TipoExameFisico
    },

    /**
     * exclui exclui um tipo de exame fisico, dado o id
     */
    deleteTipoExameFisico: (_, { id }, { models }) => models.TipoExameFisico.destroy({
      where: {
        id
      }
    })
  }
}