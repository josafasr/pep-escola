/**
 * @title Operações sobre a tabela de apresentações de queixa
 * @module src/resolvers/queixa
 * @author Marcos Porto 
 */

import { Op } from 'sequelize'
import { formatErrors } from '../format-errors';

export default {

  Query: {

    // retorna todas as queixas
    queixas: (parents, args, { models }) => models.Queixa.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        association: 'tipoQueixa',
        attributes: ['id', 'nome']
      }
    }),

    /**
     * Busca queixas por partes do nome
     * @returns array de queixas
     */
    queixasByText: async (_, { text }, { models }) => {
      const queixas = await models.Queixa.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
          nome: { [Op.like]: `${text}%` }
        }
      })
      return queixas
    },

     // busca queixa pelo código
    queixa: (parent, { id }, { models }) => models.Queixa.findByPk(id)
  },

    Mutation: {
        // cria uma nova Queixa
        createQueixa: async (parent, args, { models }) => {
            try {
              const queixa = await models.Queixa.create(args) // ({
                
                /* nome: args.nome,
                tipoQueixaId: args.tipoQueixaId,
                createdAt: new Date(), */
              //})
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