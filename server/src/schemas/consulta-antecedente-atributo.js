/**
 * @description Descritores GraphQL para as operações sobre a relação consultas e atributos de antecedentes
 * @module src/schemas/consulta-antecedente-atributo
 * @author Josafá Santos dos Reis
 */

import { gql } from 'apollo-server-express'

export default gql`
  type ConsultaAntecedenteAtributo {
    id: Int
    atributoValor: String
    consulta: Consulta
    antecedente: Antecedente
    antecedenteAtributo: AntecedenteAtributo
  }

  type ConsultaAntecedenteAtributoResponse {
    ok: Boolean
    consultaAntecedenteAtributo: ConsultaAntecedenteAtributo
    consultaAntecedenteAtributos: [ConsultaAntecedenteAtributo]
    errors: [Error]
  }

  input ConsultaAntecedenteAtributoInput {
    atributoValor: String
    # consultaId: ID!
    antecedenteId: Int!
    antecedenteAtributoId: Int
  }

  type Query {
    consultaAntecedenteAtributo(id: Int!): ConsultaAntecedenteAtributo
    consultaAntecedenteAtributos: [ConsultaAntecedenteAtributo]
    consultaAntecedenteAtributosByConsulta(consultaId: ID!): [ConsultaAntecedenteAtributo]
  }

  type Mutation {
    createConsultaAntecedenteAtributo(atributoValor: String, consultaId: ID, antecedenteId: Int!, antecedenteAtributoId: Int!): ConsultaAntecedenteAtributoResponse
    # bulkCreateConsultaAntecedenteAtributo(consultaAntecedenteAtributos: [ConsultaAntecedenteAtributoInput]!): ConsultaAntecedenteAtributoResponse
    updateConsultaAntecedenteAtributo(id: Int!, atributoValor: String): ConsultaAntecedenteAtributoResponse
    deleteConsultaAntecedenteAtributo(id: Int!): Boolean
  }
`