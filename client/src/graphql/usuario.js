/**
 * @title API GraphQL sobre usuários
 * @module src/graphql/usuario
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
      grupos {
        id
        nome
      }
    }
  }
`

export const USUARIOS_BY_TEXT = gql`
  query UsuariosByText($text: String!) {
    usuariosByText(text: $text) {
      id
      pessoa {
        id
        nome
      }
    }
  }
`

export const GET_ALL = gql`
  query Usuarios {
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

export const TRY_LOGIN = gql`
  query TryLogin($nome: String!, $senha: String!) {
    login(nome: $nome, senha: $senha) {
      ok
      token
      errors {
        path
        message
      }
    }
  }
`

export const LOGOUT = gql`
  mutation Logout {
    logout
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
