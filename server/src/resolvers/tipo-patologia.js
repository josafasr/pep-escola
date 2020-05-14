/**
 * @file Operações sobre a tabela de apresentações de tipo de patologia
 * @module resolvers/tipo-patologia
 * @author Marcos Porto 
 */

import { formatErrors } from '../format-errors';

  export default {
     Query: {

         /**
          * retorna todos os registros de tipo de patologia
          */
         tiposPatologia: (parent, args, { models }) => models.TipoPatologia.findAll(),
    
         /**
          * restorna um registro de tipo de patologia pelo id
          */
         tipoPatologia: (parent, { id }, { models }) => models.TipoPatologia.findByPk(id)
       },

      Mutation: {

        /**
         * cria um novo registro de tipo de patologia
         */

        createTipoPatologia: async (parent, args, { models }) => {
          try {
            const tipoPatologia = await models.TipoPatologia.create({
              nome: args.nome,
              descricao: args.descricao,
              createdAt: new Date(),
            })
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
        updateTipoPatologia: (parent, args, {models}) => models.TipoPatologia.update({
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
         * exclui um registro de tipo de patologia, dado o id
         */
        deleteTipoPatologia: (parent, { id }, { models }) => models.TipoPatologia.destroy({
          where: {
            id
          }
        })
      }  
  };