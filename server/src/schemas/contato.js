/**
 * @file Descritores GraphQL para as operações sobre a tabela de contatos
 * @module src/schemas/contato
 * @author Josafá Santos
 */
export default `

  type Contato {
    id: ID
    celular: String
    telefone: String
    email: String
    homePage: String
  }

  input ContatoInput {
    id: ID
    celular: String
    telefone: String
    email: String
    homePage: String
  }

  type CreateContatoResponse {
    ok: Boolean
    contato: Contato
    errors: [Error]
  }

  type Query {
    contatos: [Contato]
    contato(id: ID!): Contato
  }

  type Mutation {
    createContatoBkp(
      celular: String,
      telefone: String,
      email: String,
      homePage: String
    ): Contato

    createContato(
      celular: String,
      telefone: String,
      email: String,
      homePage: String
    ): CreateContatoResponse

    updateContato(
      id: ID!,
      celular: String,
      telefone: String,
      email: String,
      homePage: String
    ): Contato

    deleteContato(id: ID!): Boolean
  }
`
