/**
 * @title API GraphQL sobre patologias
 * @module src/graphql/patologia
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

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