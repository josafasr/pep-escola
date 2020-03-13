/**
 * @file Descritores GraphQL para as operações sobre a tabela de usuários
 * @module schemas/usuario
 * @author Josafá Santos
 */
export default `
  type Usuario {
    id: ID
    nome: String
    email: String
    senha: String
    grupos: [Grupo]
  }

  type CreateUsuarioResponse {
    ok: Boolean
    user: Usuario
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
  }

  type Mutation {
    createUsuario(nome: String, email: String, senha: String, grupos: [Int]): CreateUsuarioResponse
    updateUsuario(id: ID!, nome: String, senha: String, grupos: [Int]): Usuario
    deleteUsuario(id: ID!): Boolean
    login(nome: String, senha: String): LoginResponse
  }
`
