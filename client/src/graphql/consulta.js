/**
 * @file API GraphQL sobre os dados de consulta
 * @module src/graphql/consulta
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const GET_BY_PACIENTE = gql`
  query GetByPaciente($pacienteId: ID!) {
    consultasByPaciente(pacienteId: $pacienteId) {
      id
      createdAt
      acompanhante
      historiaDoencaAtual
      queixaPrincipalObs
      queixas {
        id
        nome
      }
    }
  }`

export const GET_WITH_INCLUDES = gql`
  query GetWithIncludes($id: ID!) {
    consulta(id: $id) {
      id
      createdAt
      paciente {
        id
        pessoa {
          id
          nome
          dataNascimento
          sexo
          enderecos {
            id
            tipoLogradouro {
              id
              nome
            }
            logradouro
            numero
            complemento
            bairro
            cep
            cidade {
              id
              nome
            }
          }
          contato {
            id
            celular
            telefone
            email
          }
        }
        prontuario
        rg
        cpf
        cartaoFamilia
        cns
        agenteComunitario
        encaminhadoPor
        unidadeSaude {
          id
          nome
        }
        naturalidade {
          id
          nome
        }
        estadoCivil {
          id
          nome
        }
        religiao {
          id
          nome
        }
        corPele {
          id
          nome
        }
        escolaridade {
          id
          nome
        }
        profissao {
          id
          nome
        }
        situacaoProfissional {
          id
          nome
        }
        especialidades {
          id
          nome
        }
      }
      acompanhante
      queixaPrincipal {
        id
        nome
      }
      historiaDoencaAtual
      queixaPrincipalObs
      queixas {
        id
        nome
      }
    }
  }`

export const CREATE_CONSULTA = gql`
  mutation CreateConsulta(
    $acompanhante: String,
    $queixaPrincipalObs: String,
    $historiaDoencaAtual: String,
    $pacienteId: ID!,
    $queixaPrincipalId: ID,
    $queixas: [ID]
  ) {
    createConsulta(
      acompanhante: $acompanhante,
      queixaPrincipalObs: $queixaPrincipalObs,
      historiaDoencaAtual: $historiaDoencaAtual,
      pacienteId: $pacienteId,
      queixaPrincipalId: $queixaPrincipalId
      queixas: $queixas
    ) {
      ok
      consulta {
        id
        acompanhante
        queixaPrincipalObs
        historiaDoencaAtual
        queixaPrincipal {
          id
          nome
        }
        queixas {
          id
          nome
        }
      }
      errors {
        path
        message
      }
    }
  }`

export const QUEIXA_PRINCIPAL = gql`
  query QueixaPrincipal($id: ID!) {
    queixaPrincipal(id: $id) {
      id
      nome
    }
  }
`
export const LOAD_DROP_DOWNS = gql`
  query LoadDropDowns {
    unidadesSaude {
      id
      nome
      cnes
    }
    estadosCivis {
      id
      nome
    }
    religioes {
      id
      nome
    }
    coresPele {
      id
      nome
    }
    escolaridades {
      id
      nome
    }
    profissoes {
      id
      nome
    }
    situacoesProfissionais {
      id
      nome
    }
  }`