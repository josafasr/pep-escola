/**
 * @title Descritores GraphQL para as operações sobre a tabela de consultas
 * @module src/schemas/consulta
 * @author Josafá Santos dos Reis
 */
export default `
  type Consulta {
    id: ID
    responsaveis: [Usuario]
    paciente: Paciente
    acompanhante: String
    queixaPrincipalObs: String  # excluir
    historiaDoencaAtual: String
    recordatorioAlimentar: [RecordatorioAlimentar]
    queixaPrincipal: Queixa
    queixas: [Queixa]
    complementosQueixas: [ComplementoConsultaTipoQueixa]
    exameFisico: [ExameFisico]
    complementosExameFisico: [ComplementoConsultaExameFisico]
    indicadoresExameFisico: IndicadoresExameFisico
    suspeitasDiagnosticas: String
    planoConduta: String
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
      responsaveis: [ID]
      pacienteId: ID!,
      acompanhante: String,
      queixaPrincipalObs: String,
      historiaDoencaAtual: String,
      queixaPrincipalId: ID,
      queixas: [ID],
      complementosQueixas: [ComplementoConsultaTipoQueixaInput],
      recordatorioAlimentar: [RecordatorioAlimentarInput],
      exameFisico: [ID],
      complementosExameFisico: [ComplementoConsultaExameFisicoInput]
      indicadoresExameFisico: IndicadoresExameFisicoInput,
      suspeitasDiagnosticas: String,
      planoConduta: String,
    ): ConsultaResponse

    updateConsulta(
      id: ID!,
      responsaveis: [ID]
      acompanhante: String,
      queixaPrincipalObs: String,
      historiaDoencaAtual: String,
      queixaPrincipalId: ID,
      queixas: [ID],
      complementosQueixas: [ID],
      recordatorioAlimentar: [RecordatorioAlimentarInput],
      indicadoresExameFisico: IndicadoresExameFisicoInput,
      exameFisico: [ID],
      suspeitasDiagnosticas: String,
      planoConduta: String,
    ): ConsultaResponse

    deleteConsulta(id: ID!): Boolean
  }
`
