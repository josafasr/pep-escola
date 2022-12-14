/**
 * @description Operações sobre a tabela de apresentações de tipo de refeição
 * @module src/resolvers/tipo-refeicao
 * @author Marcos Porto, Josafá Santos dos Reis
 */

import { formatErrors } from '../format-errors';

  export default {
     Query: {

         /**
          * retorna todos os registros de tipo de refeição
          */
         tiposRefeicao: async (_, __, { models }) => {
           const tiposRefeicao = await models.TipoRefeicao.findAll({
             order: [ 'id' ]
           })
           return tiposRefeicao
         },
    
         /**
          * retorna um registro de tipo de refeição pelo id
          */
         tipoRefeicao: (parent, { id }, { models }) => models.TipoRefeicao.findByPk(id)
       },

       Mutation: {

        /**
         * cria um novo registro de tipo de refeicao
         */
        createTipoRefeicao: async (parent, args, { models }) => {
          try {
            const tipoRefeicao = await models.TipoRefeicao.create({
              nome: args.nome,
              createdAt: new Date(),
            })
            return {
              ok: true,
              tipoRefeicao
            }
          } catch (err) {
            return {
              ok: false,
              errors: formatErrors(err, models)
              }
          }
          
        },
    
        /**
         * atualiza um registro de tipo de refeicao, dado o id
         */
        updateTipoRefeicao: async (parent, args, { models }) => {
          const result = await models.TipoRefeicao.update({
            nome: args.nome,
            updatedAt: new Date(),
          }, {
            where: { id: args.id },
            returning: true,
            plain: true
          })
          const TipoRefeicao = result[1]
          return TipoRefeicao
        },
    
        /**
         * exclui exclui um tipo de refeicao, dado o id
         */
        deleteTipoRefeicao: (parent, { id }, { models }) => models.TipoRefeicao.destroy({
          where: {
            id
          }
        })
      }
    }