/**
 * @file Descritores GraphQL para as operações sobre a tabela de pacientes
 * @module src/schemas/paciente
 * @author Josafá Santos dos Reis
 */
export default `
  type Paciente {
    id: ID
    rg: String
    cpf: String
    cartaoFamilia: String
    cns: String
    agenteComunitario: String
    encaminhadoPor: String
    passoa: Pessoa
    nacionalidade: Pais
    naturalidade: Cidade
    estadoCivil: EstadoCivil
    religiao: Religiao
    corPele: CorPele
    escolaridade: Escolaridade
    profissao: Profissao
    situacaoProfissional: SituacaoProfissional
    especialidades: Especialidade
  }

  type Query {
    pacientes: [Paciente]
    paciente(id: ID!): Paciente
  }

  type PacienteResponse {
    ok: Boolean
    paciente: Paciente
    errors: [Error]
  }

  type Mutation {
    createPaciente(
      rg: String,
      cpf: String,
      cartaoFamilia: String,
      cns: String,
      agenteComunitario: String,
      encaminhadoPor: String,
      pessoaId: ID!,
      unidadeSaudeId: ID,
      nacionalidadeId: Int,
      naturalidadeId: Int,
      estadoCivilId: Int,
      religiaoId: Int,
      corPeleId: Int,
      escolaridadeId: Int,
      profissaoId: Int,
      situacaoProfissionalId: Int,
      especialidades: [ID]
    ): PacienteResponse

    updatePaciente(
      id: ID!,
      rg: String,
      cpf: String,
      cartaoFamilia: String,
      cns: String,
      agenteComunitario: String,
      encaminhadoPor: String,
      pessoaId: ID,
      unidadeSaudeId: ID,
      nacionalidadeId: Int,
      naturalidadeId: Int,
      estadoCivilId: Int,
      religiaoId: Int,
      corPeleId: Int,
      escolaridadeId: Int,
      profissaoId: Int,
      situacaoProfissionalId: Int,
      especialidades: [ID]
    ): PacienteResponse

    deletePaciente(id: ID!): Int
  }
`
