/**
 * @title API GraphQL sobre os dados de consulta
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
      primeira
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
        # encaminhadoPor
        unidadeSaude {
          id
          nome
        }
        nacionalidade {
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
      complementosQueixas {
        id
        complemento
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
      indicadoresExameFisico {
        id
        peso
        altura
        imc
        quadril
        indiceCq
        circunferenciaAbdomen
        circunferenciaBraco
        bracadeiraApropriada
        paSentadoMsd
        paSentadoMse
        paSentadoSeg
        paEmPe
        fr
        pulso
        fc
        spo2
        temperatura
        pasDopplerMsd
        pasDopplerMid
        pasDopplerMie
        pasDopplerMse
        itb
      }
      exameFisico {
        id
        nome
        tipoExameFisico {
          id nome
        }
      }
      complementosExameFisico {
        id
        complemento
        tipoExameFisico {
          id
          nome
        }
      }
      antecedentesAtributos {
        id atributoValor
        # AntecedenteAtributo
        antecedenteAtributo {
          id nome tipoDado
          # Antecedente
          tipoAntecedente {
            id nome
          }
        }
        antecedente {
          id nome
        }
      }
      complementosAntecedentes {
        id
        complemento
        tipoAntecedente {
          id
          nome
        }
      }
      suspeitasDiagnosticas
      planoConduta
      responsaveis {
        id
        pessoa {
          id
          nome
        }
      }
    }
  }
`

export const PRIMEIRA_CONSULTA_OF_PACIENTE = gql`
  query PrimeiraConsultaOfPaciente($pacienteId: ID!) {
    primeiraConsultaOfPaciente(pacienteId: $pacienteId) {
      id createdAt
      # ConsultaAntecedenteAtributo
      antecedentesAtributos {
        id atributoValor
        # AntecedenteAtributo
        antecedenteAtributo {
          id nome tipoDado
          # Antecedente
          tipoAntecedente {
            id nome
          }
        }
        antecedente {
          id nome
        }
      }
      complementosAntecedentes {
        id
        complemento
        tipoAntecedente {
          id
          nome
        }
      }
    }
  }
`

export const CREATE_CONSULTA = gql`
  mutation CreateConsulta(
    $pacienteId: ID!,
    $acompanhante: String,
    $queixaPrincipalObs: String,
    $historiaDoencaAtual: String,
    $queixaPrincipalId: ID,
    $queixas: [ID],
    $complementosQueixas: [ComplementoConsultaTipoQueixaInput],
    $recordatorioAlimentar: [RecordatorioAlimentarInput],
    $indicadoresExameFisico: IndicadoresExameFisicoInput,
    $exameFisico: [ID],
    $complementosExameFisico: [ComplementoConsultaExameFisicoInput]
    $antecedentesAtributos: [ConsultaAntecedenteAtributoInput]
    $complementosAntecedentes: [ComplementoConsultaAntecedenteInput]
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
      complementosQueixas: $complementosQueixas
      indicadoresExameFisico: $indicadoresExameFisico,
      exameFisico: $exameFisico,
      complementosExameFisico: $complementosExameFisico,
      antecedentesAtributos: $antecedentesAtributos,
      complementosAntecedentes: $complementosAntecedentes,
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