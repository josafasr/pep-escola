/**
 * @title API GraphQL sobre exame físico
 * @module src/graphql/exame-fisico
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const EXAME_FISICO = gql`
  query ExameFisico($id: ID!) {
    exameFisico(id: $id) {
      id
      nome
    }
  }`

export const EXAMES_FISICOS = gql`
  query ExamesFisicos {
    examesFisicos {
      id
      nome
      tipoExameFisico {
        id
        nome
      }
    }
  }`

export const EXAMES_FISICOS_BY_TEXT = gql`
  query ExamesFisicosByText($text: String!) {
    exameFisicoByText(text: $text) {
      id
      nome
    }
  }`

export const TIPOS_EXAME_FISICO = gql`
  query TiposExameFisico {
    tiposExameFisico {
      id
      nome
      descricao
    }
  }`

export const CREATE_EXAME_FISICO = gql`
  mutation CreateExameFisico($nome: String, $tipoExameFisicoId: ID!) {
    createExameFisico(nome: $nome, tipoExameFisicoId: $tipoExameFisicoId) {
      ok
      exameFisico {
        id
        nome
      }
      errors {
        path
        message
      }
    }
  }`
