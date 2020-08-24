/**
 * @title API GraphQL sobre contatos
 * @module src/components/contato/api
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

// const contatoApi = {
export const FIND_BY_PK = gql`
  query Contato($id: ID!) {
    contato(id: $id) {
      id
      celular
      telefone
      email
    }
  }`

export const FIND_ALL = gql`
  query Contato {
    contatos {
      id
      celular
      telefone
      email
    }
  }`

  /* createMutation: gql`
    mutation($celular: String, $telefone: String, $email: String) {
      createContato(celular: $celular, telefone: $telefone, email: $email) {
        ok
        contato {
          id
          celular
          telefone
          email
        }
        errors {
          path
          message
        }
      }
    }`, */

export const CREATE_CONTATO = gql`
  mutation CreateContato($celular: String, $telefone: String, $email: String) {
    createContato(celular: $celular, telefone: $telefone, email: $email) {
      ok
      contato {
        id
        celular
        telefone
        email
      }
    }
  }`

export const UPDATE_CONTATO = gql`
  mutation UpdateContato($id: ID!, $celular: String, $telefone: String, $email: String) {
    updateContato(id: $id, celular: $celular, telefone: $telefone, email: $email) {
      id
      celular
      telefone
      email
    }
  }`

export const DELETE_CONTATO = gql`
  mutation DeleteContato($id: ID!) {
    deleteContato(id: $id)
  }`
// }

// export default contatoApi