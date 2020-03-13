/**
 * @file API GraphQL sobre usuários
 * @module src/components/user/api
 * @author Josafá Santos
 */

import gql from 'graphql-tag'

export default {
  findByIdQuery: gql`
    query($id: ID!) {
      usuario(id: $id) {
        id
        nome
        senha
      }
    }`,

  findAllQuery: gql`
    {
      usuarios {
        id
        nome
        senha
      }
    }`,

  createMutation: gql`
    mutation($nome: String, $email: String, $senha: String) {
      createUsuario(nome: $nome, email: $email, senha: $senha) {
        ok
        user {
          id
          nome
          email
          senha
        }
        errors {
          path
          message
        }
      }
    }`,

  updateMutation: gql`
    mutation($id: ID!, $nome: String, $senha: String) {
      updateUsuario(id: $id, nome: $nome, senha: $senha) {
        id
        nome
        senha
      }
    }`,

  destroyMutation: gql`
    mutation($id: ID!) {
      deleteUsuario(id: $id)
    }`
}