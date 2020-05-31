/**
 * @file Acesso à API GraphQL sobre estados civis
 * @module src/graphql/estado-civil
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const ESTADO_CIVIL = gql`
  query EstadoCivil($id: ID!) {
    estadoCivil(id: $id) {
      id
      nome
    }
  }`

export const ESTADOS_CIVIS = gql`
  query EstadosCivis {
    estadosCivis {
      id
      nome
    }
  }`
