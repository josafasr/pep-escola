/**
 * @description Descritores GraphQL para as operações sobre a tabela de responsaveis pela consulta
 * @module src/schemas/responsavel-consulta
 * @author Josafá Santos dos Reis
 */
export default `

  type ResponsavelConsulta {
    id: ID
    nomes: String
  }

  input ResponsavelConsultaInput {
    nomes: String
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
    createResponsavelConsulta(
      nomes: String
    ): ResponsavelConsultaResponse

    updateResponsavelConsulta(
      id: ID!,
      nomes: String
    ): ResponsavelConsulta

    deleteResponsavelConsulta(id: ID!): Boolean
  }
`
