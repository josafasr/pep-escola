/**
 * @file Operações sobre a tabela de apresentações de tipo de queixas
 * @module resolvers/tipo-queixa
 * @author Marcos Porto 
 */
import { Op } from 'sequelize'

import { formatErrors } from '../format-errors';

  export default {
     Query: {

         /**
          * retorna todos os registros de tipo de queixa
          */
         tiposQueixa: (parent, args, { models }) => models.TipoQueixa.findAll({
           include: {
             association: 'queixas'
           },
           order: [ 'id' ]
           /* ,
           where: {
            id: { [Op.in]: [1, 2, 6, 7, 8] }
          } */
         }),
    
         /**
          * restorna um registro de tipo de queixa pelo id
          */
         tipoQueixa: (parent, { id }, { models }) => models.TipoQueixa.findByPk(id)
       },

      Mutation: {

        /**
         * cria um novo registro de tipo de queixa
         */

        createTipoQueixa: async (parent, args, { models }) => {
          try {
            const tipoQueixa = await models.TipoQueixa.create({
              nome: args.nome,
              descricao: args.descricao,
              createdAt: new Date(),
            })
            return {
              ok: true,
              tipoQueixa
            }
          } catch (err) {
            return {
              ok: false,
              errors: formatErrors(err, models)
              }
          }
          
        },
        /**
         * atualiza um registro de tipo de queixa, dado o id
         */
        updateTipoQueixa: (parent, args, {models}) => models.TipoQueixa.update({
            nome: args.nome,
            descricao: args.descricao,
            updatedAt: new Date()
        }, {
            where: {
                id: args.id
            },
            returning: true,
            plain: true
          }).then((result) => { result[1] }),
    
        /**
         * exclui exclui um registro de tipo de queixa, dado o id
         */
        deleteTipoQueixa: (parent, { id }, { models }) => models.TipoQueixa.destroy({
          where: {
            id
          }
        })
      }  
  };