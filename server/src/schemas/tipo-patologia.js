/**
 * @file Descritores GraphQL para as operações sobre a tabela de tipos de patologia
 * @module schemas/tipo-patologia
 * @author Marcos Porto 
 */

export default `
type TipoPatologia {
  id: ID
  nome: String
  descricao: String
}

type CreateTipoPatologiaResponse {
  ok: Boolean
  tipoPatologia: TipoPatologia
  errors: [Error]
}

type Query {
  tiposPatologia: [TipoPatologia]
  tipoPatologia(id: ID!): TipoPatologia
}

type Mutation {
  createTipoPatologia(nome: String, descricao: String): CreateTipoPatologiaResponse
  updateTipoPatologia(id: ID!, nome: String, descricao: String): CreateTipoPatologiaResponse
  deleteTipoPatologia(id: ID!): Boolean
}
`