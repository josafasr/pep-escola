/**
 * @file Descritores GraphQL para as operações sobre a tabela de usuários
 * @module src/schemas/usuario
 * @author Josafá Santos dos Reis
 */
export default `
  type Usuario {
    id: ID
    nome: String
    senha: String
    pessoa: Pessoa
    grupos: [Grupo]
  }

  type CreateUsuarioResponse {
    ok: Boolean
    usuario: Usuario
    errors: [Error]
  }

  type LoginResponse {
    ok: Boolean
    token: String
    reloadToken: String
    errors: [Error]
  }

  type Query {
    usuario(id: ID!): Usuario
    usuarios: [Usuario]
    findAllFields(id: ID!): Usuario
  }

  type Mutation {
    createUsuario(
      nome: String!,
      senha: String!,
      pessoaId: Int!,
      grupos: [Int]
    ): CreateUsuarioResponse

    updateUsuario(
      id: ID!,
      nome: String,
      senha: String,
      pessoaId: Int,
      grupos: [Int]
    ): CreateUsuarioResponse

    deleteUsuario(id: ID!): Boolean

    login(nome: String!, senha: String!): LoginResponse
  }
`
