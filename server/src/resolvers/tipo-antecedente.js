/**
 * @description Resolvers GraphQL para operações com tipos de antecedentes
 * @module src/resolvers/tipo-antecedente
 * @author Josafá Santos dos Reis
 */

import TipoAntecedenteRepository from '../data/tipo-antecedente'

export default {
  Query: {
    tiposAntecedente: async () => await TipoAntecedenteRepository.findAll(),

    tiposAntecedenteWithAssociations: async () => await TipoAntecedenteRepository.findWithAssociations()
  },
  
  Mutation: {
    createTipoAntecedente: async (_, args) => await TipoAntecedenteRepository.create(args)
  }
}