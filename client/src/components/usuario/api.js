/**
 * @file API GraphQL sobre usuários
 * @module src/components/user/api
 * @author Josafá Santos
 */

import gql from 'graphql-tag'

const usuarioApi = {
  findByIdQuery: gql`
    query($id: ID!) {
      usuario(id: $id) {
        id
        pessoa {
          id
          nome
          contato {
            id
            email
          }
        }
        nome
        senha
        grupos {
          id
          nome
        }
      }
    }`,

  findAllQuery: gql`
    {
      usuarios {
        id
        nome
        pessoa {
          id
          nome
          contato {
            id
            email
          }
        }
        senha
        grupos {
          id
          nome
        }
      }
    }`,

  findAllFieldsQuery: gql`
    query FindAllFields($id: ID!) {
      usuario(id: $id) {
        id
        nome
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
        grupos {
          id
          nome
        }
      }
    }
    `
  ,

  createMutation: gql`
    mutation CreateUsuario($nome: String!, $senha: String!, $pessoaId: Int!, $grupos: [Int]) {
      createUsuario(nome: $nome, senha: $senha, pessoaId: $pessoaId, grupos: $grupos) {
        ok
        usuario {
          id
          pessoa {
            nome
          }
          nome
          senha
          grupos {
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
    mutation($nome: String, $senha: String, $pessoaId: Int, $grupos: [Int]) {
      updateUsuario(id: $id, nome: $nome, senha: $senha, pessoaId: $pessoaId, grupos: $grupos) {
        id
        pessoa {
          nome
        }
        nome
        senha
        grupos {
          nome
        }
      }
    }`,

  destroyMutation: gql`
    mutation($id: ID!) {
      deleteUsuario(id: $id)
    }`
}

export default usuarioApi