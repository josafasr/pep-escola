/**
 * @description Operações sobre a tabela de responsaveis pala consulta
 * @module src/resolvers/responsavelConsulta-consulta
 * @author Josafá Santos dos Reis
 */

import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de responsavelConsulta
     */
     responsaveisConsulta: (parent, args, { models }) => models.ResponsavelConsulta.findAll(),

    /**
     * restorna um registro de responsavelConsulta pelo id
     */
    responsavelConsulta: (parent, { id }, { models }) => models.ResponsavelConsulta.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de responsavelConsulta
     */
    createResponsavelConsulta: async (parent, args, { models }) => {
      try {
        const responsavelConsulta = await models.ResponsavelConsulta.create(args)
        return {
          ok: true,
          responsavelConsulta
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
          }
      }
      
    },

    /**
     * atualiza um registro de responsavelConsulta, dado o id
     */
    updateResponsavelConsulta: async (parent, { id, ...args }, { models }) => {
      const result = await models.ResponsavelConsulta.update(args, {
        where: { id },
        returning: true,
        plain: true
      })
      const responsavelConsulta = result[1]
      return responsavelConsulta
    },

    /**
     * exclui exclui um registro de responsavelConsulta, dado o id
     */
    deleteResponsavelConsulta: (parent, { id }, { models }) => models.ResponsavelConsulta.destroy({
      where: {
        id
      }
    })
  }
}
