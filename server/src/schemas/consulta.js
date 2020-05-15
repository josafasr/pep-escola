/**
 * @file Descritores GraphQL para as operações sobre a tabela de consultas
 * @module src/schemas/consulta
 * @author Josafá Santos dos Reis
 */
export default `
  type Consulta {
    id: ID
    acompanhante: String
    queixaPrincipalObs: String
    historiaDoencaAtual: String
    paciente: Paciente
    recordatorioAlimentar: [RecordatorioAlimentar]
    queixas: [Queixa]
  }

  type Query {
    consultas: [Consulta]
    consulta(id: ID!): Consulta
  }

  type ConsultaResponse {
    ok: Boolean
    consulta: Consulta
    errors: [Error]
  }

  type Mutation {
    createConsulta(
      acompanhante: String,
      queixaPrincipalObs: String,
      historiaDoencaAtual: String,
      pacienteId: ID!,
      recordatorioAlimentar: [ID]
      queixas: [ID]
    ): ConsultaResponse

    updateConsulta(
      id: ID!,
      acompanhante: String,
      queixaPrincipalObs: String,
      historiaDoencaAtual: String,
      pacienteId: ID,
      recordatorioAlimentar: [ID]
      queixas: [ID]
    ): ConsultaResponse

    deleteConsulta(id: ID!): Int
  }
`
