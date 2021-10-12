/**
 * @description Descritores GraphQL para as operações sobre a tabela de permissoes
 * @module src/schemas/permissao
 * @author Josafá Santos dos Reis
 */
export default `
  type Permissao {
    id: ID
    nome: String
    descricao: String
    grupos: [Grupo]
  }

  type PermissaoResponse {
    ok: Boolean
    permissao: Permissao
    errors: [Error]
  }

  type Query {
    permissao(id: ID!): Permissao
    permissoes: [Permissao]
  }

  type Mutation {
    createPermissao(nome: String, descricao: String): PermissaoResponse
    updatePermissao(id: ID!, nome: String, descricao: String): PermissaoResponse
    deletePermissao(id: ID!): Int
  }
`
