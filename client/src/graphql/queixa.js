/**
 * @file API GraphQL sobre queixas
 * @module src/graphql/queixa
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const QUEIXA = gql`
  query Queixa($id: ID!) {
    queixa(id: $id) {
      id
      nome
    }
  }`

export const QUEIXAS = gql`
  query Queixas {
    queixas {
      id
      nome
    }
  }`

export const QUEIXAS_BY_TEXT = gql`
  query QueixasByText($text: String!) {
    queixasByText(text: $text) {
      id
      nome
    }
  }`

export const TIPOS_QUEIXA = gql`
  query tiposQueixa {
    tiposQueixa {
      id
      nome
    }
  }`

export const CREATE_QUEIXA = gql`
  mutation CreateQueixa($nome: String, $tipoQueixaId: ID!) {
    createQueixa(nome: $nome, tipoQueixaId: $tipoQueixaId) {
      ok
      queixa {
        id
        nome
      }
      errors {
        path
        message
      }
    }
  }`
