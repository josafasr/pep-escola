/**
* @description Operações sobre a tabela de apresentações de Unidades de saúde
* @module src/resolvers/unidade-saude
* @author Marcos Porto
*/

import { formatErrors } from '../format-errors'
import UnidadeSaudeRepository from '../data/unidade-saude'

export default {

  // retorna todos as Unidades de saúde
  Query: {
    unidadesSaude: async (_, args) => await UnidadeSaudeRepository.findAll(args),

    // busca unidadeSaude pelo código
    unidadeSaude: async (parent, { id }, { models }) => {
      const unidadeSaude = await models.UnidadeSaude.findByPk(id) // , {
      return unidadeSaude
    },

    unidadesSaudeByText: async (_, { text }) => await UnidadeSaudeRepository.findByText(text)
  },

  Mutation: {
    // cria um novo unidadeSaude
    createUnidadeSaude: async (_, args) => await UnidadeSaudeRepository.create(args),

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
