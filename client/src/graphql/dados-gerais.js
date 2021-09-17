/**
 * @description API GraphQL sobre os dados gerais
 * @module src/graphql/dados-gerais
 * @author Josafá Santos dos Reis
 */

 import gql from 'graphql-tag'

 export const PROFISSOES_BY_TEXT = gql`
  query ProfissoesByText($text: String!) {
    profissoesByText(text: $text) {
      id
      nome
    }
 `