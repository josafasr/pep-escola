/**
 * @file Descritores GraphQL para as operações sobre a tabela de tipos de queixa
 * @module schemas/tipo-queixa
 * @author Marcos Porto 
 */

export default `
  type TipoQueixa {
    id: ID
    nome: String
    descricao: String
    queixas: [Queixa]
  }

  input TipoQueixaInput {
    id: ID
    nome: String
    descricao: String
  }

  type CreateTipoQueixaResponse {
    ok: Boolean
    tipoQueixa: TipoQueixa
    errors: [Error]
  }

  type Query {
    tiposQueixa: [TipoQueixa]
    tipoQueixa(id: ID!): TipoQueixa
  }

  type Mutation {
    createTipoQueixa(nome: String, descricao: String): CreateTipoQueixaResponse
    updateTipoQueixa(id: ID!, nome: String, descricao: String): CreateTipoQueixaResponse
    deleteTipoQueixa(id: ID!): Boolean
  }
`