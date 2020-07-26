/**
 * @file API GraphQL sobre usuários
 * @module src/components/user/api
 * @author Josafá Santos
 */

import gql from 'graphql-tag'

// const usuarioApi = {
export const GET_BY_ID = gql`
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
  }
`

export const GET_ALL = gql`
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
  }
`

// findAllFieldsQuery: 
export const GET_WITH_INCLUDES = gql`
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

// createMutation: 
export const CREATE_USUARIO = gql`
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
  }
`

export const CREATE_WITH_INCLUDES = gql`
  mutation CreateUsuarioWithIncludes($nome: String!, $senha: String!, $pessoa: PessoaInput!, $grupos: [ID]) {
    createUsuarioWithIncludes(nome: $nome, senha: $senha, pessoa: $pessoa, grupos: $grupos) {
      ok
      usuario {
        id
        pessoa {
          id
          nome
        }
        nome
        senha
        grupos {
          id
          nome
        }
      }
      errors {
        path
        message
      }
    }
  }
`

// updateMutation:
export const UPDATE_USUARIO = gql`
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
  }
`

// destroyMutation:
export const DELETE_USUARIO = gql`
  mutation($id: ID!) {
    deleteUsuario(id: $id)
  }
`