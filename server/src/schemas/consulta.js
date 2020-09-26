/**
 * @title Descritores GraphQL para as operações sobre a tabela de consultas
 * @module src/schemas/consulta
 * @author Josafá Santos dos Reis
 */
export default `
  type Consulta {
    id: ID
    acompanhante: String
    queixaPrincipalObs: String  # excluir
    historiaDoencaAtual: String
    paciente: Paciente
    recordatorioAlimentar: [RecordatorioAlimentar]
    queixaPrincipal: Queixa
    queixas: [Queixa]
    suspeitasDiagnosticas: String
    planoConduta: String
    createdAt: String
  }

  type Query {
    consultas: [Consulta]
    consulta(id: ID!): Consulta
    consultasByPaciente(pacienteId: ID!): [Consulta]
    queixaPrincipal(id: ID!): Queixa
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
      recordatorioAlimentar: [RecordatorioAlimentarInput]
      queixaPrincipalId: ID
      queixas: [ID],
      suspeitasDiagnosticas: String,
      planoConduta: String
    ): ConsultaResponse

    updateConsulta(
      id: ID!,
      acompanhante: String,
      queixaPrincipalObs: String,
      historiaDoencaAtual: String,
      suspeitasDiagnosticas: String,
      planoConduta: String,
      pacienteId: ID!,
      recordatorioAlimentar: [RecordatorioAlimentarInput]
      queixas: [ID]
    ): ConsultaResponse

    deleteConsulta(id: ID!): Boolean
  }
`
