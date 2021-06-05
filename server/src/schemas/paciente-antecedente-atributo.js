/**
 * @description Descritores GraphQL para as operações sobre a relação pacientese e atributos de antecedentes
 * @module src/schemas/paciente-antecedente-atributo
 * @author Josafá Santos dos Reis
 */

import { gql } from 'apollo-server-express'

export default gql`
  type PacienteAntecedenteAtributo {
    id: Int
    atributoValor: String
    paciente: Paciente
    antecedente: Antecedente
    antecedenteAtributo: AntecedenteAtributo
  }

  type PacienteAntecedenteAtributoResponse {
    ok: Boolean
    pacienteAntecedenteAtributo: PacienteAntecedenteAtributo
    pacienteAntecedenteAtributos: [PacienteAntecedenteAtributo]
    errors: [Error]
  }

  input PacienteAntecedenteAtributoInput {
    atributoValor: String
    pacienteId: ID!
    antecedenteId: Int!
    antecedenteAtributoId: Int
  }

  type Query {
    pacienteAntecedenteAtributo(id: Int!): PacienteAntecedenteAtributo
    pacienteAntecedenteAtributos: [PacienteAntecedenteAtributo]
    pacienteAntecedenteAtributosByPaciente(pacienteId: ID!): [PacienteAntecedenteAtributo]
  }

  type Mutation {
    createPacienteAntecedenteAtributo(atributoValor: String, pacienteId: ID, antecedenteId: Int!, antecedenteAtributoId: Int!): PacienteAntecedenteAtributoResponse
    bulkCreatePacienteAntecedenteAtributo(pacienteAntecedenteAtributos: [PacienteAntecedenteAtributoInput]!): PacienteAntecedenteAtributoResponse
    updatePacienteAntecedenteAtributo(id: Int!, atributoValor: String): PacienteAntecedenteAtributoResponse
    deletePacienteAntecedenteAtributo(id: Int!): Boolean
  }
`