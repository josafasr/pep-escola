/**
 * @file Descritores GraphQL para as operações sobre a tabela de pacientes
 * @module schemas/paciente
 * @author Josafá Santos
 */
export default `
  type Paciente {
    id: ID
    rg: String
    cpf: String
    cartaoFamilia: String
    cns: String
    agenteComunitario: String
    passoa: Pessoa
    nacionalidade: Pais
    naturalidade: Cidade
    estadoCivil: EstadoCivil
    religiao: Religiao
    corPele: CorPele
    escolaridade: Escolaridade
    profissao: Profissao
    situacaoProfissional: SituacaoProfissional
  }

  type Query {
    pacientes: [Paciente]
    paciente(id: ID!): Paciente
  }

  type Mutation {
    createPaciente(
      rg: String,
      cpf: String,
      cartaoFamilia: String,
      cns: String,
      agenteComunitario: String,
      passoaId: Int,
      nacionalidadeId: Int,
      naturalidadeId: Int,
      estadoCivilId: Int,
      religiaoId: Int,
      corPeleId: Int,
      escolaridadeId: Int,
      profissaoId: Int,
      situacaoProfissionalId: Int
    ): Paciente

    updatePaciente(
      id: ID!,
      rg: String,
      cpf: String,
      cartaoFamilia: String,
      cns: String,
      agenteComunitario: String,
      passoaId: Int,
      nacionalidadeId: Int,
      naturalidadeId: Int,
      estadoCivilId: Int,
      religiaoId: Int,
      corPeleId: Int,
      escolaridadeId: Int,
      profissaoId: Int,
      situacaoProfissionalId: Int
    ): Paciente

    deletePaciente(id: ID!): Int
  }
`
