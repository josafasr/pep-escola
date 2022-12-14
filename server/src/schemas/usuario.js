/**
 * @description Descritores GraphQL para as operações sobre a tabela de usuários
 * @module src/schemas/usuario
 * @author Josafá Santos dos Reis
 */

import { gql } from 'apollo-server-express'

export default gql`
  type Usuario {
    id: ID
    nome: String
    # senha: String
    pessoa: Pessoa
    grupos: [Grupo]
  }

  type UsuarioResponse {
    ok: Boolean
    usuario: Usuario
    errors: [Error]
  }

  type LoginResponse {
    ok: Boolean
    token: String
    # reloadToken: String
    errors: [Error]
  }

  type UpdateResponse {
    ok: Boolean
    errors: [Error]
  }

  type Query {
    usuario(id: ID!): Usuario

    usuarios: [Usuario]

    usuariosByText(text: String!): [Usuario]

    findAllFields(id: ID!): Usuario

    currentUser: Usuario

    login(nome: String!, senha: String!): LoginResponse

    refreshToken: LoginResponse
  }

  type Mutation {
    createUsuario(
      nome: String!,
      senha: String!,
      pessoaId: ID,
      grupos: [ID]
    ): UsuarioResponse

    createUsuarioWithIncludes(
      nome: String!,
      senha: String!,
      pessoa: PessoaInput!,
      grupos: [ID]
    ): UsuarioResponse

    updateUsuario(
      id: ID!,
      nome: String,
      senha: String,
      pessoa: PessoaInput,
      grupos: [ID]
    ): UsuarioResponse

    deleteUsuario(id: ID!): Boolean

    logout: Boolean

    revokeRefreshToken(userId: ID!): Boolean

    changePassword(id: ID!, previousPassword: String!, newPassword: String!): UpdateResponse
  }

  type Subscription {
    userLogged:  LoginResponse
  }
`
