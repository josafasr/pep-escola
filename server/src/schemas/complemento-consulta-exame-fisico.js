/**
 * @description Descritores GraphQL para as operações sobre a tabela complemento de queixa
 * @module src/schemas/complemento-consulta-exame-fisico
 * @author Josafá Santos dos Reis
 */

import { gql } from 'apollo-server-express'

export default gql`
  type ComplementoConsultaExameFisico {
    id: ID
    complemento: String
    consulta: Consulta
    tipoExameFisico: TipoExameFisico
  }

  input ComplementoConsultaExameFisicoInput {
    # id: ID
    complemento: String
    tipoExameFisicoId: ID
  }

  type ComplementoConsultaExameFisicoResponse {
    ok: Boolean
    complementoConsultaExameFisico: ComplementoConsultaExameFisico
    errors: [Error]
  }

  type Query {
    complementoConsultaExameFisico(id: ID!): ComplementoConsultaExameFisico
    complementosConsultaExameFisico: [ComplementoConsultaExameFisico]
    complementosExameFisicoByConsulta(consultaId: ID!): [ComplementoConsultaExameFisico]
  }

  type Mutation{
    createComplementoConsultaExameFisico(complemento: String, consultaId: ID, tipoExameFisicoId: ID): ComplementoConsultaExameFisicoResponse
    updateComplementoConsultaExameFisico(id: ID!, complemento: String): ComplementoConsultaExameFisicoResponse
  }
`