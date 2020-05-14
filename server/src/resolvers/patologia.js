/**
 * @file Operações sobre a tabela de apresentações de Unidades de saúde
 * @module resolvers/unidade-saude
 * @author Marcos Porto 
 */

import { formatErrors } from '../format-errors';

export default{

    Query: {

        /**
         * retorna todos os registros de patologia
         */
        patologias: (parent, args, { models }) => models.Contato.findAll(),
    
        /**
         * retorna um registro de patologia pelo id
         */
        patologia: (parent, { id }, { models }) => models.Contato.findByPk(id)
      },

  Mutation: {
      // cria uma nova Patologia
      createPatologia: async (parent, args, { models }) => {
          try {
            const patologia = await models.Patologia.create({
              nome: args.nome,
              descricao: args.descricao,
              tipoPatologiaId: args.tipoPatologiaId,
              createdAt: new Date(),
            })
            return {
              ok: true,
              patologia
            }
          } catch (err) {
            return {
              ok: false,
              errors: formatErrors(err, models)
              }
          }
          
        },

      // atualiza dados da Patologia
      updatePatologia: (parent, args, {models}) => models.Patologia.update({
          nome: args.nome,
          descricao: args.descricao,
          tipoPatologiaId: args.tipoPatologiaId,
          updatedAt: new Date()
      }, {
          where: {
              id: args.id
          },
          returning: true,
          plain: true
        }).then((result) => { result[1] }),

      // exclui a Patologia
      deletePatologia: (parent, { id }, { models }) => models.Patologia.destroy({
          where: {
          id
          }
        })    
      }

      
};