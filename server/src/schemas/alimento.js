/**
 * @file Descritores GraphQL para as operações sobre a tabela de alimentos
 * @module src/schemas/alimento
 * @author Josafá Santos dos Reis
 */

export default `
type Alimento {
    id: ID
    nome: String
}

type CreateAlimentoResponse {
    ok: Boolean
    alimento: Alimento
    errors: [Error]
  }

type Query {
    alimento(id: ID!): Alimento
    alimentos: [Alimento]
}

type Mutation{
    createAlimento(nome: String): CreateAlimentoResponse
    updateAlimento(id: ID!, nome: String): CreateAlimentoResponse
    deleteAlimento(id: ID!): Boolean
}
`