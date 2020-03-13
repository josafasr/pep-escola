/**
 * @file Descritores GraphQL para as operações sobre a tabela de profissões
 * @module schemas/profissao
 * @author Josafá Santos
 */
export default `
  type Profissao {
    id: ID
    nome: String
  }

  type Query {
    profissoes: [Profissao]
    profissao(id: ID!): Profissao
  }

  type Mutation {
    createProfissao(nome: String): Profissao
    updateProfissao(id: ID!, nome: String): Profissao
    deleteProfissao(id: ID!): Int
  }
`
