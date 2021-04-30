/**
 * @title Descritores GraphQL para as operações sobre a tabela de tipos de patologia
 * @module ssrc/schemas/tipo-patologia
 * @author Marcos Porto, Josafá Santos dos Reis
 */

export default `
  type TipoPatologia {
    id: Int
    nome: String
    descricao: String
  }

  input TipoPatologiaInput {
    id: Int
    nome: String
    descricao: String
  }

  type TipoPatologiaResponse {
    ok: Boolean
    tipoPatologia: TipoPatologia
    errors: [Error]
  }

  type Query {
    tiposPatologia: [TipoPatologia]
    tipoPatologia(id: Int!): TipoPatologia
  }

  type Mutation {
    createTipoPatologia(nome: String, descricao: String): TipoPatologiaResponse
    updateTipoPatologia(id: Int!, nome: String, descricao: String): TipoPatologiaResponse
    deleteTipoPatologia(id: Int!): Boolean
  }
`