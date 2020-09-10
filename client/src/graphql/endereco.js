/**
 * @title API GraphQL sobre endereços
 * @module src/graphql/endereco
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const LOAD_DROP_DOWNS = gql`
  query LoadDropDowns {
    tiposLogradouro {
      id
      nome
    }

    cidades {
      id
      nome
    }
  }`