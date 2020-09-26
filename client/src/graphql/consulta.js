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
        tipoQueixa {
          id
          nome
        }
      }
      recordatorioAlimentar {
        id
        quantidade
        alimento {
          id
          nome
        }
        tipoRefeicao {
          id
          nome
        }
      }
      suspeitasDiagnosticas
      planoConduta
    }
  }`

export const CREATE_CONSULTA = gql`
  mutation CreateConsulta(
    $pacienteId: ID!,
    $acompanhante: String,
    $queixaPrincipalObs: String,
    $historiaDoencaAtual: String,
    $queixaPrincipalId: ID,
    $queixas: [ID],
    $recordatorioAlimentar: [RecordatorioAlimentarInput],
    $suspeitasDiagnosticas: String,
    $planoConduta: String
  ) {
    createConsulta(
      pacienteId: $pacienteId,
      acompanhante: $acompanhante,
      queixaPrincipalObs: $queixaPrincipalObs,
      historiaDoencaAtual: $historiaDoencaAtual,
      recordatorioAlimentar: $recordatorioAlimentar,
      queixaPrincipalId: $queixaPrincipalId
      queixas: $queixas,
      suspeitasDiagnosticas: $suspeitasDiagnosticas,
      planoConduta: $planoConduta
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
        recordatorioAlimentar {
          id
          quantidade
          alimento {
            id
            nome
          }
          tipoRefeicao {
            id
            nome
          }
        }
        suspeitasDiagnosticas
        planoConduta
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