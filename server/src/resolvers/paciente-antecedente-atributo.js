/**
 * @description Resolvers GraphQL para operações com valores de atributos de antecedentes
 * @module src/resolvers/paciente-antecedente-atributo
 * @author Josafá Santos dos Reis
 */

import PacienteAntecedenteAtributoRepository from '../data/paciente-antecedente-atributo'

export default {
  Query: {
    pacienteAntecedenteAtributos: async () => await PacienteAntecedenteAtributoRepository.findAll(),

    pacienteAntecedenteAtributosByPaciente: async (_, { pacienteId }) =>
      await PacienteAntecedenteAtributoRepository.findByPaciente(pacienteId)
  },
  
  Mutation: {
    createPacienteAntecedenteAtributo: async (_, args) => await PacienteAntecedenteAtributoRepository.create(args),

    bulkCreatePacienteAntecedenteAtributo: async (_, { pacienteAntecedenteAtributos }) =>
      await PacienteAntecedenteAtributoRepository.bulkCreate(pacienteAntecedenteAtributos)
  }
}