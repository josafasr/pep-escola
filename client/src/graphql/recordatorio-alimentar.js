/**
 * @title Acesso à API GraphQL sobre o recordatório alimentar
 * @module src/graphql/recordatorio-alimentar
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const TIPOS_REFEICAO = gql`
  query TiposRefeicao {
    tiposRefeicao {
      id
      nome
    }
  }`

export const ALIMENTOS_BY_TEXT = gql`
  query AlimentosByText($text: String!) {
    alimentosByText(text: $text) {
      id
      nome
    }
  }`
