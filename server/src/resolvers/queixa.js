/**
 * @file Operações sobre a tabela de apresentações de queixa
 * @module resolvers/queixa
 * @author Marcos Porto 
 */

  import { formatErrors } from '../format-errors';

  export default{

    // retorna todos as Queixa
     Query: {
             queixas: ( parents, args, {models}) => models.Queixa.findAll({
                 include: [
                     {
                         as: 'consulta_queixa',
                         model: models.ConsultaQueixa
                    }
                ]
            }),

     // busca queixa pelo código
     queixa: (parent, { id }, { models }) => models.Queixa.findByPk(id, {
         include: [
             {
                as: 'consulta_queixa',
                 model: models.ConsultaQueixa 
              }
          ]
      })
     },

    Mutation: {
        // cria uma nova Queixa
        createQueixa: async (parent, args, { models }) => {
            try {
              const queixa = await models.Queixa.create({
                nome: args.nome,
                tipoQueixaId: args.tipoQueixaId,
                createdAt: new Date(),
              })
              return {
                ok: true,
                queixa
              }
            } catch (err) {
              return {
                ok: false,
                errors: formatErrors(err, models)
                }
            }
            
          },

        // atualiza dados da Queixa
        updateQueixa: (parent, args, {models}) => models.Queixa.update({
            nome: args.nome,
            tipoQueixaId: args.tipoQueixaId,
            updatedAt: new Date()
        }, {
            where: {
                id: args.id
            },
            returning: true,
            plain: true
          }).then((result) => { result[1] }),

        // exclui a Queixa
        deleteQueixa: (parent, { id }, { models }) => models.Queixa.destroy({
            where: {
            id
            }
          })    
        }

        
  };