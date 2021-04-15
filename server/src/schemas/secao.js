/**
 * @title Descritores GraphQL para as operações sobre a tabela de seções
 * @module src/schemas/secao
 * @author Josafá Santos dos Reis
 */
export default `
  type Secao {
    id: ID
    nome: String
    descricao: String
    usuario: Usuario
  }

  type SecaoResponse {
    statusCode: Int
    secao: Secao
    message: String
  }

  type Query {
    secao(id: ID!): Secao
    secoes: [Secao]
  }

  type Mutation {
    createSecao(nome: String, descricao: String, usuarioId: ID): SecaoResponse
    updateSecao(id: ID!, nome: String, descricao: String, usuarioId: ID): SecaoResponse
    deleteSecao(id: ID!): Boolean
  }
`
