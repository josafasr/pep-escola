/**
 * @description Resolvers GraphQL para operações sobre a tabela de atributos de antecedentes
 * @module src/resolvers/antecedente-atributo
 * @author Josafá Santos dos Reis
 */

import AntecedenteAtributoRepository from '../data/antecedente-atributo'

export default {
  Query: {
    antecedenteAtributos: async () => await AntecedenteAtributoRepository.findAll(),

    atributosByAntecedente: async (_, { antecedenteId }) =>
      await AntecedenteAtributoRepository.findByAntecedente(antecedenteId)
  },
  
  Mutation: {
    createAntecedenteAtributo: async (_, args) => await AntecedenteAtributoRepository.create(args)
  }
}