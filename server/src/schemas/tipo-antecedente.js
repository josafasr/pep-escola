/**
 * @description Descritores GraphQL para as operações sobre a tabela de tipos de antecedentes
 * @module src/schemas/tipo-antecedente
 * @author Josafá Santos dos Reis
 */

import { gql } from 'apollo-server-express'

export default gql`
  type TipoAntecedente {
    id: Int
    nome: String
    descricao: String
    antecedentes: [Antecedente]
    atributos: [AntecedenteAtributo]
  }

  type TipoAntecedenteResponse {
    ok: Boolean
    tipoAntecedente: TipoAntecedente
    errors: [Error]
  }

  type Query {
    tipoAntecedente(id: Int!): TipoAntecedente
    tiposAntecedente: [TipoAntecedente]
    tiposAntecedenteWithAssociations: [TipoAntecedente]
  }

  type Mutation{
    createTipoAntecedente(nome: String, descricao: String): TipoAntecedenteResponse
    updateTipoAntecedente(id: Int!, nome: String, descricao: String): TipoAntecedenteResponse
    deleteTipoAntecedente(id: Int!): Boolean
  }
`