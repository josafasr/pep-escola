/**
 * @title API GraphQL sobre patologias
 * @module src/graphql/patologia
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const CREATE_PATOLOGIA = gql`
  mutation CreatePatologia($nome: String, $tipoPatologiaId: Int) {
    createPatologia(nome: $nome, tipoPatologiaId: $tipoPatologiaId) {
      ok
      patologia {
        id nome
      }
      errors {
        path
        message
      }
    }
  }
`

export const TIPOS_PATOLOGIA = gql`
  query TiposPatologia {
    tiposPatologia {
      id nome descricao
    }
  }
`

export const PATOLOGIAS = gql`
  query Patologias {
    patologias {
      id nome descricao
      tipoPatologia {
        id nome descricao
      }
    }
  }
`