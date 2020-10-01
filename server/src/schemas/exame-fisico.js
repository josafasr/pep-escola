/**
 * @title Descritores GraphQL para as operações sobre a tabela de exame físico
 * @module src/schemas/exame-fisico
 * @author Josafá Santos dos Reis
 */

export default `
  type ExameFisico {
    id: ID
    nome: String
    tipoExameFisico: TipoExameFisico
    consultas: [Consulta]
  }

  type ExameFisicoResponse {
    ok: Boolean
    exameFisico: ExameFisico
    errors: [Error]
  }

  type Query {
    exameFisico(id: ID!): ExameFisico
    examesFisicos: [ExameFisico]
    examesFisicosByText(text: String!): [ExameFisico]
  }

  type Mutation {
    createExameFisico(nome: String, tipoExameFisicoId: ID!): ExameFisicoResponse
    updateExameFisico(id: ID!, nome: String, tipoExameFisicoId: ID): ExameFisicoResponse
    deleteExameFisico(id: ID!): Boolean
  }
`