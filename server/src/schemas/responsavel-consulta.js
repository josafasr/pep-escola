/**
 * @description Descritores GraphQL para as operações sobre a tabela de responsaveis pela consulta
 * @module src/schemas/responsavel-consulta
 * @author Josafá Santos dos Reis
 */
export default `

  type ResponsavelConsulta {
    id: ID
    responsaveis: String
  }

  input ResponsavelConsultaInput {
    responsaveis: String
  }

  type ResponsavelConsultaResponse {
    ok: Boolean
    responsavelConsulta: ResponsavelConsulta
    errors: [Error]
  }

  type Query {
    responsaveisConsulta: [ResponsavelConsulta]
    responsavelConsulta(id: ID!): ResponsavelConsulta
  }

  type Mutation {
    createResponsavelConsultaBkp(
      responsaveis: String
    ): ResponsavelConsulta

    createResponsavelConsulta(
      responsaveis: String
    ): ResponsavelConsultaResponse

    updateResponsavelConsulta(
      id: ID!,
      responsaveis: String
    ): ResponsavelConsulta

    deleteResponsavelConsulta(id: ID!): Boolean
  }
`
