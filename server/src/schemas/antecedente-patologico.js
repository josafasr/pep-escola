/**
 * @title Descritores GraphQL para a tabela de antecedentes patológicos
 * @module src/schemas/antecedente-patologico
 * @author Josafá Santos dos Reis
 */

import { gql } from 'apollo-server-express'

export default gql`
  type AntecedentePatologico {
    id: Int
    patologia: Patologia
    tempoDiagnostico: String
  }

  input AntecedentePatologicoInput {
    pacienteId: ID
    patologiaId: ID
    tempoDiagnostico: String
  }

  type AntecedentePatologicoResponse {
    ok: Boolean
    antecedentePatologico: AntecedentePatologico
    errors: [Error]
  }

  type Query {
    antecedentesPatologicosByPaciente(pacienteId: ID!): [AntecedentePatologico]!
  }

  type Mutation {
    createAntecedentePatologico(
      pacienteId: ID!,
      patologiaId: ID!,
      tempoDiagnostico: String
    ): AntecedentePatologicoResponse
  }
`