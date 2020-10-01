/**
 * @title Operações sobre a tabela de exame físico
 * @module src/resolvers/exame-fisico
 * @author Josafá Santos dos Reis
 */

import { Op } from 'sequelize'
import { formatErrors } from '../format-errors';

export default {

  Query: {

    // retorna todos os exames fisicos
    examesFisicos: (_, { models }) => models.ExameFisico.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        association: 'tipoExameFisico',
        attributes: ['id', 'nome']
      }
    }),

    /**
     * Busca exames fisicos pelo inicio do nome
     * @returns array de exames fisicos
     */
    examesFisicosByText: async (_, { text }, { models }) => {
      const examesFisicos = await models.ExameFisico.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
          nome: { [Op.like]: `${text}%` }
        }
      })
      return examesFisicos
    },

     // busca um exame fisico pelo código
     exameFisico: (_, { id }, { models }) => models.ExameFisico.findByPk(id)
  },

  Mutation: {
    // cria uma novo exame fisico
    createExameFisico: async (_, args, { models }) => {
      try {
        const exameFisico = await models.ExameFisico.create(args)
        return {
          ok: true,
          exameFisico
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
      
    },

    // atualiza dados de um exame fisico, dado o seu id
    updateExameFisico: async (_, args, {models}) => {
      try {
        const exameFisico = await models.ExameFisico.update(/* {
          nome: args.nome,
          tipoExameFisicoId: args.tipoExameFisicoId,
          updatedAt: new Date()
        } */
        args, {
          where: {
              id: args.id
          },
          returning: true,
          plain: true
        })//.then((result) => { result[1] }),
        return {
          ok: true,
          exameFisico: exameFisico[1]
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    // exclui um exame fisico, dado o seu id
    deleteExameFisico: ({ id }, { models }) => models.ExameFisico.destroy({
      where: {
        id
      }
    })    
  }        
}