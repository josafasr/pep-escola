/**
 * @description Descritores GraphQL para as operações sobre a tabela de antecedentes
 * @module src/schemas/antecedente
 * @author Josafá Santos dos Reis
 */

import { gql } from 'apollo-server-express'

export default gql`
  type Antecedente {
    id: Int
    nome: String
    descricao: String
    tipoAntecedente: TipoAntecedente
  }

  type TipoAntecedenteResponse {
    ok: Boolean
    antecedente: Antecedente
    errors: [Error]
  }

  type Query {
    antecedente(id: Int!): Antecedente
    antecedentes: [Antecedente]
  }

  type Mutation{
    createAntecedente(nome: String, descricao: String, tipoAntecedenteId: Int): TipoAntecedenteResponse
    updateAntecedente(id: Int!, nome: String, descricao: String, tipoAntecedenteId: Int): TipoAntecedenteResponse
    deleteAntecedente(id: Int!): Boolean
  }
  `