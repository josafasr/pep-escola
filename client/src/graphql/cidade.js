/**
 * @file Acesso à API GraphQL sobre cidades
 * @module src/graphql/cidade
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const CIDADE = gql`
  query Cidade($id: ID!) {
    cidade(id: $id) {
      id
      nome
      codigoIBGE
    }
  }`

export const CIDADES = gql`
  query Cidades {
    cidades {
      id
      nome
      codigoIBGE
    }
  }`
