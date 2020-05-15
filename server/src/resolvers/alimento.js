/**
 * @file Operações sobre a tabela de apresentações de alimentos
 * @module src/resolvers/alimento
 * @author Josafá Santos dos Reis
 */

import { formatErrors } from '../format-errors';

  export default {
     Query: {

         /**
          * retorna todos os registros de alimento
          */
         alimentos: (parent, args, { models }) => models.Alimento.findAll({
           attributes: { exclude: ['createdAt', 'updatedAt'] }
         }),
    
         /**
          * retorna um registro de alimento pelo id
          */
         alimento: (parent, { id }, { models }) => models.Alimento.findByPk(id, {
           attributes: { exclude: ['createdAt', 'updatedAt'] }
         })
       },

       Mutation: {

        /**
         * cria um novo registro de alimento
         */
        createAlimento: async (parent, args, { models }) => {
          try {
            const alimento = await models.Alimento.create(args)
            return {
              ok: true,
              alimento
            }
          } catch (err) {
            return {
              ok: false,
              errors: formatErrors(err, models)
              }
          }
          
        },
    
        /**
         * atualiza um registro de alimento, dado o id
         */
        updateAlimento: async (parent, args, { models }) => {
          const result = await models.Alimento.update(args, {
            where: { id: args.id },
            returning: true,
            plain: true
          })
          const alimento = result[1]
          return alimento
        },
    
        /**
         * exclui exclui um alimento, dado o id
         */
        deleteAlimento: (parent, { id }, { models }) => models.Alimento.destroy({
          where: {
            id
          }
        })
      }
    }