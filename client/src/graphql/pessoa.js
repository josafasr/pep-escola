/**
 * @file API GraphQL sobre pessoas
 * @module src/components/pessoa/api
 * @author Josafá Santos
 */

import gql from 'graphql-tag'

const pessoaApi = {
  findByIdQuery: gql`
    query($id: ID!) {
      pessoa(id: $id) {
        id
        nome
        dataNascimento
        sexo
        contato {
          id
          celular
          telefone
          email
          homePage
        }
        enderecos {
          id
          tipoLogradouro {
            id
            nome
          }
          logradouro
          numero
          bairro
          complemento
          cep
          cidade {
            id
            nome
          }
        }
      }
    }`,

  findAllQuery: gql`
    {
      pessoas {
        id
        nome
        dataNascimento
        sexo
        contato {
          id
          celular
          telefone
          email
          homePage
        }
        enderecos {
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

  createMutation: gql`
    mutation($nome: String!, $dataNascimento: String, $sexo: String, $contatoId: Int, $enderecos: [Int]) {
      createPessoa(nome: $nome, dataNascimento: $dataNascimento, sexo: $sexo, contatoId: $contatoId, enderecos: $enderecos) {
        ok
        pessoa {
          id
          nome
          dataNascimento
          sexo
          contato {
            id
            celular
            telefone
            email
            homePage
          }
          enderecos {
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
        errors {
          path
          message
        }
      }
    }`,

  updateMutation: gql`
    mutation($id: ID!, $nome: String, $dataNascimento: String, $sexo: String, $contato: String, $enderecos: [Int]) {
      updatePessoa(id: $id, nome: $nome, dataNascimento: $dataNascimento, sexo: $sexo, contato: $contato, enderecos: $enderecos) {
        id
        nome
        dataNascimento
        sexo
        contato {
          id
          celular
          telefone
          email
          homePage
        }
        enderecos {
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
      deletePessoa(id: $id)
    }`
}

export default pessoaApi
