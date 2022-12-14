/**
 * @description Descritores GraphQL para as operações sobre a tabela de consultas
 * @module src/schemas/consulta
 * @author Josafá Santos dos Reis
 */

import { gql } from 'apollo-server-express'

export default gql`
  type Consulta {
    id: ID
    primeira: Boolean
    responsaveis: ResponsavelConsulta
    paciente: Paciente
    acompanhante: String
    fonteEncaminhamento: String
    queixaPrincipalObs: String  ########## excluir
    historiaDoencaAtual: String
    recordatorioAlimentar: [RecordatorioAlimentar]
    complementoRecordatorioAlimentar: ComplementoRecordatorioAlimentar
    queixaPrincipal: Queixa
    queixas: [Queixa]
    complementosQueixas: [ComplementoConsultaTipoQueixa]
    exameFisico: [ExameFisico]
    complementosExameFisico: [ComplementoConsultaExameFisico]
    indicadoresExameFisico: IndicadoresExameFisico
    suspeitasDiagnosticas: String
    planoConduta: String
    avaliacao: AvaliacaoAtendimento
    antecedentesAtributos: [ConsultaAntecedenteAtributo]
    complementosAntecedentes: [ComplementoConsultaAntecedente]
    createdAt: String
  }

  type Query {
    consultas: [Consulta]
    consulta(id: ID!, pacienteId: ID!): Consulta
    consultasByPaciente(pacienteId: ID!): [Consulta]
    primeiraConsultaOfPaciente(pacienteId: ID!): Consulta
    queixaPrincipal(id: ID!): Queixa
  }

  type ConsultaResponse {
    ok: Boolean
    consulta: Consulta
    errors: [Error]
  }

  type Mutation {
    createConsulta(
      primeira: Boolean,
      responsaveis: ResponsavelConsultaInput,
      pacienteId: ID!,
      acompanhante: String,
      fonteEncaminhamento: String,
      queixaPrincipalObs: String,
      historiaDoencaAtual: String,
      queixaPrincipalId: ID,
      queixas: [ID],
      complementosQueixas: [ComplementoConsultaTipoQueixaInput],
      recordatorioAlimentar: [RecordatorioAlimentarInput],
      complementoRecordatorioAlimentar: ComplementoRecordatorioAlimentarInput,
      exameFisico: [ID],
      complementosExameFisico: [ComplementoConsultaExameFisicoInput]
      antecedentesAtributos: [ConsultaAntecedenteAtributoInput]
      complementosAntecedentes: [ComplementoConsultaAntecedenteInput]
      indicadoresExameFisico: IndicadoresExameFisicoInput,
      suspeitasDiagnosticas: String,
      planoConduta: String,
    ): ConsultaResponse

    updateConsulta(
      id: ID!,
      primeira: Boolean,
      #responsaveis: ResponsavelConsultaInput,
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
      planoConduta: String
    ): ConsultaResponse

    deleteConsulta(id: ID!): Boolean
  }
`
