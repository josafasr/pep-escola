/**
 * @file Acesso à API GraphQL sobre profissões
 * @module src/graphql/profissao
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const PROFISSAO = gql`
  query Profissao($id: ID!) {
    profissao(id: $id) {
      id
      nome
    }
  }`

export const PROFISSOES = gql`
  query Profissoes {
    profissoes {
      id
      nome
    }
  }`

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
/* 
export const CREATE_CONTATO = gql`
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
  }`

export const UPDATE_CONTATO = gql`
  mutation UpdateContato($id: ID!, $celular: String, $telefone: String, $email: String, $homePage: String) {
    updateContato(id: $id, celular: $celular, telefone: $telefone, email: $email, homePage: $homePage) {
      id
      celular
      telefone
      email
      homePage
    }
  }`

export const DELETE_CONTATO = gql`
  mutation DeleteContato($id: ID!) {
    deleteContato(id: $id)
  }` */
