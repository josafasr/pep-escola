/**
 * @description Consultas GraphQL sobre antecedentes
 * @module src/graphql/antecedente
 * @author Josafá Santos dos Reis
 */

import gql from 'graphql-tag'

export const CREATE_ANTECEDENTE = gql`
  mutation CreateAntecedente($nome: String, $descricao: String, $tipoAntecedenteId: Int) {
    createAntecedente(nome: $nome, descricao: $descricao, tipoAntecedenteId: $tipoAntecedenteId) {
      ok
      antecedente {
        id nome
      }
      errors {
        path message
      }
    }
  }
`

export const CREATE_PACIENTE_ANTECEDENTE_ATRIBUTO = gql`
  mutation CreatePacienteAntecedenteAtributo(
    $atributoValor: String,
    $pacienteId: ID,
    $antecedenteId: Int,
    $antecedenteAtributoId: Int
  ) {
    createPacienteAntecedenteAtributo(
      atributoValor: $atributoValor,
      pacienteId: $pacienteId,
      antecedenteId: $antecedenteId,
      antecedenteAtributoId: $antecedenteAtributoId
    ) {
      ok
      pacienteAntecedenteAtributo {
        id atributoValor
      }
      errors {
        path message
      }
    }
  }
`

export const BULK_CREATE_PACIENTE_ANTECEDENTE_ATRIBUTO = gql`
  mutation BulkCreatePacienteAntecedenteAtributo($pacienteAntecedenteAtributos: [PacienteAntecedenteAtributoInput]!) {
    bulkCreatePacienteAntecedenteAtributo(pacienteAntecedenteAtributos: $pacienteAntecedenteAtributos) {
      ok
      pacienteAntecedenteAtributos {
        id atributoValor
      }
      errors {
        path message
      }
    }
  }
`

export const TIPOS_ANTECEDENTE = gql`
  query TiposAntecedente {
    tiposAntecedente {
      id nome descricao
    }
  }
`

export const TIPOS_ANTECEDENTE_WITH_ASSOCIATIONS = gql`
  query TiposAntecedenteWithAssociations {
    tiposAntecedenteWithAssociations {
      id nome descricao
      antecedentes {
        id nome
      }
      atributos {
        id nome tipoDado
      }
    }
  }
`

export const ANTECEDENTES = gql`
  query Antecedentes {
    antecedentes {
      id nome
      tipoAntecedente {
        id nome
      }
    }
  }
`

export const ANTECEDENTE_ATRIBUTOS = gql`
  query AntecedenteAtributos {
    antecedenteAtributos {
      id nome tipoDado
      antecedente {
        id nome
        tipoAntecedente {
          id nome
        }
      }
    }
  }
`

export const ATRIBUTOS_BY_ANTECEDENTE = gql`
  query AtributosByAntecedente($antecedenteId: Int) {
    atributosByAntecedente(antecedenteId: $antecedenteId) {
      id nome tipoDado
      antecedente {
        id nome
        tipoAntecedente {
          id nome
        }
      }
    }
  }
`