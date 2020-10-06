/**
 * @title Descritores GraphQL para as operações sobre a tabela de tipos de exame físico
 * @module src/schemas/tipo-exame-fisico
 * @author Josafá Santos dos Reis
 */

export default `
  type TipoExameFisico {
    id: ID
    nome: String
    descricao: String
  }

  type TipoExameFisicoResponse {
    ok: Boolean
    tipoExameFisico: TipoExameFisico
    errors: [Error]
  }

  type Query {
    tipoExameFisico(id: ID!): TipoExameFisico
    tiposExameFisico: [TipoExameFisico]
  }

  type Mutation{
    createTipoExameFisico(nome: String, descricao: String): TipoExameFisicoResponse
    updateTipoExameFisico(id: ID!, nome: String, descricao: String): TipoExameFisicoResponse
    deleteTipoExameFisico(id: ID!): Boolean
  }
  `