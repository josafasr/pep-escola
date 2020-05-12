/**
 * @file API GraphQL sobre contatos
 * @module src/components/contato/api
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

const contatoApi = {
  findByIdQuery: gql`
    query($id: ID!) {
      contato(id: $id) {
        id
        celular
        telefone
        email
        homePage
      }
    }`,

  findAllQuery: gql`
    {
      contatos {
        id
        celular
        telefone
        email
        homePage
      }
    }`,

  /* createMutation: gql`
    mutation($celular: String, $telefone: String, $email: String, $homePage: String) {
      createContato(celular: $celular, telefone: $telefone, email: $email, homePage: $homePage) {
        ok
        contato {
          id
          celular
          telefone
          email
          homePage
        }
        errors {
          path
          message
        }
      }
    }`, */

  createMutation: gql`
    mutation CreateContato($celular: String, $telefone: String, $email: String, $homePage: String) {
      createContato(celular: $celular, telefone: $telefone, email: $email, homePage: $homePage) {
        ok
        contato {
          id
          celular
          telefone
          email
          homePage
        }
      }
    }`,

  updateMutation: gql`
    mutation($id: ID!, $celular: String, $telefone: String, $email: String, $homePage: String) {
      updateContato(id: $id, celular: $celular, telefone: $telefone, email: $email, homePage: $homePage) {
        id
        celular
        telefone
        email
        homePage
      }
    }`,

  destroyMutation: gql`
    mutation($id: ID!) {
      deleteContato(id: $id)
    }`
}

export default contatoApi