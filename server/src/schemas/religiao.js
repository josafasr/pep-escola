/**
 * @description Descritores GraphQL para as operações sobre a tabela de religiões
 * @module src/schemas/religiao
 * @author Josafá Santos dos Reis
 */
export default `
  type Religiao {
    id: ID
    nome: String
  }

  type ReligiaoResponse {
    ok: Boolean
    religiao: Religiao
    errors: [Error]
  }

  type Query {
    religioes: [Religiao]
    religiao(id: ID!): Religiao
    religioesByText(text: String): [Religiao]
  }

  type Mutation {
    createReligiao(nome: String): ReligiaoResponse
    updateReligiao(id: ID!, nome: String): ReligiaoResponse
    deleteReligiao(id: ID!): Int
  }
`
