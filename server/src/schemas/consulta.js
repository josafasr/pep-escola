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
    indicadoresExameFisico: IndicadoresExameFisico
    exameFisico: [ExameFisico]
    suspeitasDiagnosticas: String
    planoConduta: String
    responsaveis: [Usuario]
    avaliacao: AvaliacaoAtendimento
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
      pacienteId: ID!,
      acompanhante: String,
      queixaPrincipalObs: String,
      historiaDoencaAtual: String,
      queixaPrincipalId: ID,
      queixas: [ID],
      recordatorioAlimentar: [RecordatorioAlimentarInput],
      indicadoresExameFisico: IndicadoresExameFisicoInput,
      exameFisico: [ID],
      suspeitasDiagnosticas: String,
      planoConduta: String,
      responsaveis: [ID]
    ): ConsultaResponse

    updateConsulta(
      id: ID!,
      acompanhante: String,
      queixaPrincipalObs: String,
      historiaDoencaAtual: String,
      queixaPrincipalId: ID,
      queixas: [ID],
      recordatorioAlimentar: [RecordatorioAlimentarInput],
      indicadoresExameFisico: IndicadoresExameFisicoInput,
      exameFisico: [ID],
      suspeitasDiagnosticas: String,
      planoConduta: String,
      responsaveis: [ID]
    ): ConsultaResponse

    deleteConsulta(id: ID!): Boolean
  }
`
