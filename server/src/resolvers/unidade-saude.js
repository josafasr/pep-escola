/**
* @file Operações sobre a tabela de apresentações de Unidades de saúde
* @module src/resolvers/unidade-saude
* @author Marcos Porto
*/

import { formatErrors } from '../format-errors';

export default {

  // retorna todos as Unidades de saúde
  Query: {
    unidadesSaude: async (parents, args, { models }) => {
      const unidadesSaude = await models.UnidadeSaude.findAll()
      return unidadesSaude
      // {
      // include: [
      //   {
      //     as: 'pacientes',
      //     model: models.Paciente
      //   }
      // ]
      // }),
    },

    // busca unidadeSaude pelo código
    unidadeSaude: async (parent, { id }, { models }) => {
      const unidadeSaude = await models.UnidadeSaude.findByPk(id) // , {
      return unidadeSaude
      // include: [
      //   {
      //     as: 'pacientes',
      //     model: models.Paciente
      //   }
      // ]
      // })
    }
  },

  Mutation: {
    // cria um novo unidadeSaude
    createUnidadeSaude: async (parent, args, { models }) => {
      try {
        const unidadeSaude = await models.UnidadeSaude.create({
          nome: args.nome,
          cnes: args.cnes,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        return {
          ok: true,
          unidadeSaude
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    },

    // atualiza dados do UnidadeSaude
    updateUnidadeSaude: (parent, args, { models }) => models.UnidadeSaude.update({
      nome: args.nome,
      cnes: args.cnes,
      updatedAt: new Date(),
    }, {
      where: {
        id: args.id
      },
      returning: true,
      plain: true
    }).then((result) => { result[1] }),

    // exclui o UnidadeSaude
    deleteUnidadeSaude: (parent, { id }, { models }) => models.UnidadeSaude.destroy({
      where: {
        id
      }
    })
  }
};
