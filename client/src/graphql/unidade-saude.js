/**
 * @file Acesso à API GraphQL sobre unidades de saúde
 * @module src/graphql/unidade-saude
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const UNIDADE_SAUDE = gql`
  query UnidadeSaude($id: ID!) {
    unidadeSaude(id: $id) {
      id
      nome
      cnes
    }
  }`

export const UNIDADES_SAUDE = gql`
  query UnidadesSaude {
    unidadesSaude {
      id
      nome
      cnes
    }
  }`
