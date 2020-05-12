/**
 * @file API GraphQL sobre enderecos
 * @module src/components/endereco/api
 * @author Josafá Santos
 */

import gql from 'graphql-tag'

const enderecoApi = {
  findByIdQuery: gql`
    query($id: ID!) {
      endereco(id: $id) {
        id
        tipoLogradouro {
          nome
        }
        logradouro
        numero
        bairro
        complemento
        cep
        cidade {
          nome
        }
      }
    }`,

  findAllQuery: gql`
    {
      enderecos {
        id
        tipoLogradouro {
            nome
          }
        logradouro
        numero
        bairro
        complemento
        cep
        cidade {
          nome
        }
      }
    }`,

  createMutation: gql`
    mutation(
      $tipoLogradouroId: Int,
      $logradouro: String,
      $numero: Int,
      $bairro: String,
      $complemento: String,
      $cep: String,
      $cidadeId: Int,
      $ativo: Boolean
    ) {
      createEndereco(
        tipoLogradouroId: $tipoLogradouroId,
        logradouro: $logradouro,
        numero: $numero,
        bairro: $bairro,
        complemento: $complemento,
        cep: $cep,
        cidadeId: $cidadeId,
        ativo: $ativo
      ) {
        ok
        endereco {
          id
          tipoLogradouro {
            nome
          }
          logradouro
          numero
          bairro
          complemento
          cep
          cidade {
            nome
          }
        }
        errors {
          path
          message
        }
      }
    }`,

  updateMutation: gql`
    mutation($id: ID!, $tipoLogradouroId: Int, $logradouro: String, $numero: Int, $bairro: String, $complemento: String, $cep: String, $cidadeId: Int) {
      updateEndereco(id: $id, tipoLogradouroId: $tipoLogradouroId, logradouro: $logradouro, numero: $numero, bairro: $bairro, complemento: $complemento, cep: $cep, cidadeId: $cidadeId) {
        id
        enderecos {
          id
          tipoLogradouro {
            nome
          }
          logradouro
          numero
          bairro
          complemento
          cep
          cidade {
            nome
          }
        }
      }
    }`,

  destroyMutation: gql`
    mutation($id: ID!) {
      deleteEndereco(id: $id)
    }`
}

export default enderecoApi