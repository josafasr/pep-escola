/**
 * @description Descritores GraphQL para as operações sobre a tabela de atributos de antecedentes
 * @module src/schemas/antecedente-atributo
 * @author Josafá Santos dos Reis
 */

import { gql } from 'apollo-server-express'

export default gql`
  type AntecedenteAtributo {
    id: Int
    nome: String
    tipoDado: String
    tipoAntecedente: TipoAntecedente
  }

  type AntecedenteAtributoResponse {
    ok: Boolean
    antecedenteAtributo: AntecedenteAtributo
    errors: [Error]
  }

  type Query {
    antecedenteAtributo(id: Int!): AntecedenteAtributo
    antecedenteAtributos: [AntecedenteAtributo]
    atributosByAntecedente: [AntecedenteAtributo]
  }

  type Mutation {
    createAntecedenteAtributo(nome: String, tipoDado: String, tipoAntecedenteId: Int!): AntecedenteAtributoResponse
    updateAntecedenteAtributo(id: Int!, nome: String, tipoDado: String,): AntecedenteAtributoResponse
    deleteAntecedenteAtributo(id: Int!): Boolean
  }
`