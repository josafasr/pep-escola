/**
 * @title Descritores GraphQL para as operações sobre a tabela complemento de queixa
 * @module src/schemas/complemento-consulta-tipo-queixa
 * @author Josafá Santos dos Reis
 */

export default `
  type ComplementoConsultaTipoQueixa {
    id: ID
    complemento: String
    consulta: Consulta
    tipoQueixa: TipoQueixa
  }

  input ComplementoConsultaTipoQueixaInput {
    id: ID
    complemento: String
    tipoQueixa: TipoQueixaInput
  }

  type ComplementoConsultaTipoQueixaResponse {
    ok: Boolean
    complementoConsultaTipoQueixa: ComplementoConsultaTipoQueixa
    errors: [Error]
  }

  type Query {
    complementoConsultaTipoQueixa(id: ID!): ComplementoConsultaTipoQueixa
    complementosConsultaTipoQueixa: [ComplementoConsultaTipoQueixa]
    complementosQueixasByConsulta(consultaId: ID!): [ComplementoConsultaTipoQueixa]
  }

  type Mutation{
    createComplementoConsultaTipoQueixa(complemento: String, consultaId: ID, tipoQueixaId: ID): ComplementoConsultaTipoQueixaResponse
    updateComplementoConsultaTipoQueixa(id: ID!, complemento: String): ComplementoConsultaTipoQueixaResponse
    deleteComplementoConsultaTipoQueixa(id: ID!): Boolean
  }
`