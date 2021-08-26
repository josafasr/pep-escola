/**
 * @file Descritores GraphQL para as operações sobre a tabela de estados
 * @module schemas/estado
 * @author Josafá Santos
 */
export default `
  type Estado {
    id: ID
    nome: String
    sigla: String
    # pais: Pais
  }

  type Query {
    estado(id: ID!): Estado
    estados: [Estado]
  }

  type Mutation {
    createEstado(nome: String, sigla: String): Estado
    updateEstado(id: ID!, nome: String, sigla: String): Estado
    deleteEstado(id: ID!): Int
  }
`
