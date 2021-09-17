/**
 * @description Acesso à API GraphQL sobre profissões
 * @module src/graphql/profissao
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const PROFISSAO = gql`
  query Profissao($id: ID!) {
    profissao(id: $id) {
      id
      nome
    }
  }
`

export const PROFISSOES = gql`
  query Profissoes {
    profissoes {
      id
      nome
    }
  }
`

export const PROFISSOES_BY_TEXT = gql`
  query ProfissoesByText($text: String!) {
    profissoesByText(text: $text) {
      id
      nome
    }
  }
`

export const CREATE_PROFISSAO = gql`
  mutation CreateProfissao($nome: String) {
    createProfissao(nome: $nome) {
      ok
      profissao {
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