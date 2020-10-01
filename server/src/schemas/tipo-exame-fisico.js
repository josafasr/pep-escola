/**
 * @title Descritores GraphQL para as operações sobre a tabela de tipos de exame físico
 * @module src/schemas/tipo-exame-fisico
 * @author Josafá Santos dos Reis
 */

export default `
  type TipoExameFisico {
    id: ID
    nome: String
  }

  input TipoRefeicaoInput {
    id: ID
    nome: String
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
    createTipoExameFisico(nome: String): TipoExameFisicoResponse
    updateTipoExameFisico(id: ID!, nome: String): TipoExameFisicoResponse
    deleteTipoExameFisico(id: ID!): Boolean
  }
  `