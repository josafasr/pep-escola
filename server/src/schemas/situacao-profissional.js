/**
 * @file Descritores GraphQL para as operações sobre a tabela de situações profissionais
 * @module schemas/situacao-profissional
 * @author Josafá Santos
 */
export default `
  type SituacaoProfissional {
    id: ID
    nome: String
  }

  type Query {
    situacoesProfissionais: [SituacaoProfissional]
    situacaoProfissional(id: ID!): SituacaoProfissional
  }

  type Mutation {
    createSituacaoProfissional(nome: String): SituacaoProfissional
    updateSituacaoProfissional(id: ID!, nome: String): SituacaoProfissional
    deleteSituacaoProfissional(id: ID!): Int
  }
`
