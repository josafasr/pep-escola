/**
 * @description Resolvers GraphQL para operações com valores de atributos de antecedentes
 * @module src/resolvers/consulta-antecedente-atributo
 * @author Josafá Santos dos Reis
 */

import ConsultaAntecedenteAtributoRepository from '../data/consulta-antecedente-atributo'

export default {
  Query: {
    consultaAntecedenteAtributos: async () => await ConsultaAntecedenteAtributoRepository.findAll(),

    consultaAntecedenteAtributosByConsulta: async (_, { consultaId }) =>
      await ConsultaAntecedenteAtributoRepository.findByConsulta(consultaId)
  },
  
  Mutation: {
    createConsultaAntecedenteAtributo: async (_, args) => await ConsultaAntecedenteAtributoRepository.create(args),

    /* bulkCreateConsultaAntecedenteAtributo: async (_, { consultaAntecedenteAtributos }) =>
      await ConsultaAntecedenteAtributoRepository.bulkCreate(consultaAntecedenteAtributos) */
  }
}