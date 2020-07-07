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
