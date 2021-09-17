/**
 * @description Descritores GraphQL para as operações sobre a tabela de profissões
 * @module src/schemas/profissao
 * @author Josafá Santos dos Reis
 */

export default `
  type Profissao {
    id: ID
    nome: String
  }

  type ProfissaoResponse {
    ok: Boolean
    profissao: Profissao
    errors: [Error]
  }

  type Query {
    profissoes: [Profissao]
    profissao(id: ID!): Profissao
    profissoesByText(text: String): [Profissao]
  }

  type Mutation {
    createProfissao(nome: String): ProfissaoResponse
    updateProfissao(id: ID!, nome: String): ProfissaoResponse
    deleteProfissao(id: ID!): Int
  }
`
