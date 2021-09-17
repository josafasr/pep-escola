/**
 * @description Acesso à API GraphQL sobre unidades de saúde
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

export const UNIDADES_SAUDE_BY_TEXT = gql`
  query UnidadesSaudeByText($text: String!) {
    unidadesSaudeByText(text: $text) {
      id
      nome
    }
  }
`

export const CREATE_UNIDADE_SAUDE = gql`
  mutation CreateUnidadeSaude($nome: String) {
    createUnidadeSaude(nome: $nome) {
      ok
      unidadeSaude {
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