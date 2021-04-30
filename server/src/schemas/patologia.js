/**
 * @title Descritores GraphQL para as operações sobre a tabela de patologia
 * @module src/schemas/patologia
 * @author Marcos Porto, Josafá Santos dos Reis
 */

export default `
  type Patologia {
    id: ID
    nome: String
    descricao: String
    tipoPatologia: TipoPatologia
  }

  input PatologiaInput {
    id: ID
    nome: String
    descricao: String
    tipoPatologia: TipoPatologiaInput
  }

  type PatologiaResponse {
    ok: Boolean
    patologia: Patologia
    errors: [Error]
  }

  type Query {
    patologia(id: ID!): Patologia
    patologias: [Patologia]
  }

  type Mutation {
    createPatologia(nome: String, descricao: String, tipoPatologiaId: Int): PatologiaResponse
    updatePatologia(id: ID!, nome: String, tipoPatologiaId: Int): PatologiaResponse
    deletePatologia(id: ID!): Boolean
  }
`