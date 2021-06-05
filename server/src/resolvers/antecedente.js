/**
 * @description Resolvers GraphQL para operações sobre a tabela de antecedentes
 * @module src/resolvers/antecedente
 * @author Josafá Santos dos Reis
 */

import AntecedenteRepository from '../data/antecedente'

export default {
  Query: {
    antecedentes: async (_, __) => await AntecedenteRepository.findAll()
  },
  
  Mutation: {
    createAntecedente: async (_, args) => await AntecedenteRepository.create(args)
  }
}