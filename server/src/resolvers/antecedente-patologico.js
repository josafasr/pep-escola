/**
 * @description Resolvers GraphQL para operações com antecedentes patológicos
 * @module src/resolvers/antecedente-patologico
 * @author Josafá Santos dos Reis
 */

import AntecedentePatologicoRepository from '../data/antecedente-patologico'

export default {
  Query: {
    antecedentesPatologicosByPaciente: async (_, { pacienteId }) => 
      await AntecedentePatologicoRepository.findByPaciente(pacienteId)
  },
  
  Mutation: {
    createAntecedentePatologico: async (_, args) => 
      await AntecedentePatologicoRepository.create(args)
  }
}