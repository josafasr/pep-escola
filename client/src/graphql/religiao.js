/**
 * @description API GraphQL sobre religiões
 * @module src/graphql/religiao
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const RELIGIAO = gql`
  query Religiao($id: ID!) {
    religiao(id: $id) {
      id
      nome
    }
  }`

export const RELIGIOES = gql`
  query Religioes {
    religioes {
      id
      nome
    }
  }`

export const RELIGIOES_BY_TEXT = gql`
  query ReligioesByText($text: String!) {
    religioesByText(text: $text) {
      id
      nome
    }
  }
`

export const CREATE_RELIGIAO = gql`
  mutation CreateReligiao($nome: String) {
    createReligiao(nome: $nome) {
      ok
      religiao {
        id
        nome
      }
      errors {
        path
        message
      }
    }
  }
`