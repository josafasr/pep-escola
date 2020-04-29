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
}

type Query {
  tiposQueixa: [TipoQueixa]
  tipoQueixa(id: ID!): TipoQueixa
}

type Mutation {
  createTipoQueixa(nome: String, descricao: String): TipoQueixa
  updateTipoQueixa(id: ID!, nome: String, descricao: String): TipoQueixa
  deleteTipoQueixa(id: ID!): Int
}
`