/**
 * @description Descritores GraphQL para as operações sobre a tabela de pacientes
 * @module src/schemas/paciente
 * @author Josafá Santos dos Reis
 */

import { gql } from 'apollo-server-express'

export default gql`
  type Paciente {
    id: ID
    prontuario: String
    rg: String
    cpf: String
    cartaoFamilia: String
    cns: String
    agenteComunitario: String
    # encaminhadoPor: String
    pessoa: Pessoa
    unidadeSaude: UnidadeSaude
    nacionalidade: Pais
    naturalidade: Cidade
    estadoCivil: EstadoCivil
    religiao: Religiao
    corPele: CorPele
    escolaridade: Escolaridade
    tempoEstudo: TempoEstudo
    profissao: Profissao
    situacaoProfissional: SituacaoProfissional
    especialidades: [Especialidade]
    # antecedentesPatologicos: [AntecedentePatologico]
    # antecedentes: [Antecedente]
    # antecedentesAtributos: [PacienteAntecedenteAtributo]
  }

  type PacienteResponse {
    ok: Boolean
    paciente: Paciente
    errors: [Error]
  }

  type Query {
    pacientes: [Paciente]
    paciente(id: ID!): Paciente
  }


  type Mutation {
    createPaciente(
      prontuario: String,
      rg: String,
      cpf: String,
      cartaoFamilia: String,
      cns: String,
      agenteComunitario: String,
      # encaminhadoPor: String,
      pessoaId: ID!,
      unidadeSaudeId: ID,
      nacionalidadeId: ID,
      naturalidadeId: ID,
      estadoCivilId: ID,
      religiaoId: ID,
      corPeleId: ID,
      escolaridadeId: ID,
      tempoEstudoId: ID,
      profissaoId: ID,
      situacaoProfissionalId: ID,
      especialidades: [ID],
      # antecedentesPatologicos: [AntecedentePatologicoInput]
    ): PacienteResponse

    createWithIncludes(
      prontuario: String,
      rg: String,
      cpf: String,
      cartaoFamilia: String,
      cns: String,
      agenteComunitario: String,
      # encaminhadoPor: String,
      pessoa: PessoaInput,
      unidadeSaudeId: ID,
      nacionalidadeId: ID,
      naturalidadeId: ID,
      estadoCivilId: ID,
      religiaoId: ID,
      corPeleId: ID,
      escolaridadeId: ID,
      tempoEstudoId: ID,
      profissaoId: ID,
      situacaoProfissionalId: ID,
      especialidades: [ID],
      # antecedentesPatologicos: [AntecedentePatologicoInput]
    ): PacienteResponse

    updatePaciente(
      id: ID!,
      prontuario: String,
      rg: String,
      cpf: String,
      cartaoFamilia: String,
      cns: String,
      agenteComunitario: String,
      # encaminhadoPor: String,
      pessoaId: ID,
      unidadeSaudeId: ID,
      nacionalidadeId: ID,
      naturalidadeId: ID,
      estadoCivilId: ID,
      religiaoId: ID,
      corPeleId: ID,
      escolaridadeId: ID,
      tempoEstudoId: ID,
      profissaoId: ID,
      situacaoProfissionalId: ID,
      especialidades: [ID],
      # antecedentesPatologicos: [AntecedentePatologicoInput]
      # antecedentes: [Int]
      # antecedentesAtributos: [Int]
    ): PacienteResponse

    deletePaciente(id: ID!): Boolean
  }
`
