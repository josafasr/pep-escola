/**
 * @file Operações sobre a tabela de contatos
 * @module src/resolvers/contato
 * @author Josafá Santos
 */

import { formatErrors } from '../format-errors';

export default {

  Query: {

    /**
     * retorna todos os registros de contato
     */
    contatos: (parent, args, { models }) => models.Contato.findAll(),

    /**
     * restorna um registro de contato pelo id
     */
    contato: (parent, { id }, { models }) => models.Contato.findByPk(id)
  },

  Mutation: {

    /**
     * cria um novo registro de contato
     */
    createContato: async (parent, args, { models }) => {
      try {
        const contato = await models.Contato.create(args)
        return {
          ok: true,
          contato
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
          }
      }
      
    },

    /**
     * atualiza um registro de contato, dado o id
     */
    updateContato: async (parent, args, { models }) => {
      const result = await models.Contato.update({
        celular: args.celular,
        telefone: args.telefone,
        email: args.email,
        updatedAt: new Date(),
      }, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      const contato = result[1]
      return contato
    },

    /**
     * exclui exclui um registro de contato, dado o id
     */
    deleteContato: (parent, { id }, { models }) => models.Contato.destroy({
      where: {
        id
      }
    })
  }
}
