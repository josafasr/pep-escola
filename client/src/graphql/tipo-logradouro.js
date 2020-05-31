/**
 * @file Acesso à API GraphQL sobre tipos de logradouro
 * @module src/graphql/tipo_logradouro
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const TIPO_LOGRADOURO = gql`
  query TipoLogradouro($id: ID!) {
    tipoLogradouro(id: $id) {
      id
      nome
    }
  }`

export const TIPOS_LOGRADOURO = gql`
  query TiposLogradouro {
    tiposLogradouro {
      id
      nome
    }
  }`
