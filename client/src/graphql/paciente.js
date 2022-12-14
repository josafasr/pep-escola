/**
 * @description API GraphQL sobre dados de pacientes
 * @module src/graphql/paciente
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const GET_ALL = gql`
  query Pacientes {
    pacientes {
      id
      prontuario
      pessoa {
        id
        nome
        dataNascimento
        sexo
      }
      rg
      cpf
      cns
    }
  }`

export const LOAD_DROP_BOXES = gql`
  query LoadDropBoxes {
    unidadesSaude {
      id
      nome
      cnes
    }

    cidades {
      id
      nome
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

    temposEstudo {
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

export const CREATE_WITH_INCLUDES = gql`
  mutation CreateWithIncludes(
    $prontuario: String,
    $rg: String,
    $cpf: String,
    $cartaoFamilia: String,
    $cns: String,
    $agenteComunitario: String,
    # $encaminhadoPor: String,
    $pessoa: PessoaInput,
    $unidadeSaudeId: ID,
    $nacionalidadeId: ID,
    $naturalidadeId: ID,
    $estadoCivilId: ID,
    $religiaoId: ID,
    $corPeleId: ID,
    $escolaridadeId: ID,
    $tempoEstudoId: ID,
    $profissaoId: ID,
    $situacaoProfissionalId: ID,
    $especialidades: [ID]
  ) {
    createWithIncludes(
      prontuario: $prontuario,
      rg: $rg,
      cpf: $cpf,
      cartaoFamilia: $cartaoFamilia,
      cns: $cns,
      agenteComunitario: $agenteComunitario,
      # encaminhadoPor: $encaminhadoPor,
      pessoa: $pessoa,
      unidadeSaudeId: $unidadeSaudeId,
      nacionalidadeId: $nacionalidadeId,
      naturalidadeId: $naturalidadeId,
      estadoCivilId: $estadoCivilId,
      religiaoId: $religiaoId,
      corPeleId: $corPeleId,
      escolaridadeId: $escolaridadeId,
      tempoEstudoId: $tempoEstudoId,
      profissaoId: $profissaoId,
      situacaoProfissionalId: $situacaoProfissionalId,
      especialidades: $especialidades
    ) {
      ok
      paciente {
        id
        pessoa {
          nome
          dataNascimento
          sexo
          enderecos {
            logradouro
            numero
            bairro
            cep
            cidade {
              nome
            }
          }
          contato {
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
        especialidades {
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

export const UPDATE_PACIENTE = gql`
  mutation UpdatePaciente(
    $id: ID!
    $prontuario: String,
    $rg: String,
    $cpf: String,
    $cartaoFamilia: String,
    $cns: String,
    $agenteComunitario: String,
    # $encaminhadoPor: String,
    $pessoa: PessoaInput,
    $unidadeSaudeId: ID,
    $nacionalidadeId: ID,
    $naturalidadeId: ID,
    $estadoCivilId: ID,
    $religiaoId: ID,
    $corPeleId: ID,
    $escolaridadeId: ID,
    $tempoEstudoId: ID,
    $profissaoId: ID,
    $situacaoProfissionalId: ID,
    $especialidades: [ID]
  ) {
    updatePaciente(
      id: $id,
      prontuario: $prontuario,
      rg: $rg,
      cpf: $cpf,
      cartaoFamilia: $cartaoFamilia,
      cns: $cns,
      agenteComunitario: $agenteComunitario,
      # encaminhadoPor: $encaminhadoPor,
      pessoa: $pessoa,
      unidadeSaudeId: $unidadeSaudeId,
      nacionalidadeId: $nacionalidadeId,
      naturalidadeId: $naturalidadeId,
      estadoCivilId: $estadoCivilId,
      religiaoId: $religiaoId,
      corPeleId: $corPeleId,
      escolaridadeId: $escolaridadeId,
      tempoEstudoId: $tempoEstudoId,
      profissaoId: $profissaoId,
      situacaoProfissionalId: $situacaoProfissionalId,
      especialidades: $especialidades
    ) {
      ok
      paciente {
        id
        pessoa {
          id
          nome
          dataNascimento
          sexo
          enderecos {
            id
            logradouro
            numero
            bairro
            cep
            cidade {
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
        especialidades {
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

export const GET_WITH_INCLUDES = gql`
  query GetWithIncludes($id: ID!) {
    paciente(id: $id) {
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
        cnes
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
      tempoEstudo {
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
  }`

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
    temposEstudo {
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

export const DELETE_PACIENTE = gql`
  mutation($id: ID!) {
    deletePaciente(id: $id)
  }`

// export const UPDATE_ANTECEDENTES = gql`
//   mutation UpdateAntecedentes($id: ID!, $antecedentesPatologicos: [PatologiaInput]) {
//     updatePaciente(id: $id, antecedentesPatologicos: $antecedentesPatologicos) {
//       ok
//       paciente {
//         id
//         antecedentesPatologicos {
//           id nome
//         }
//       }
//       errors {
//         path
//         message
//       }
//     }
//   }
// `