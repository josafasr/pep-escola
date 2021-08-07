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
  }

  input ContatoInput {
    id: ID
    celular: String
    telefone: String
    email: String
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
      pessoaId: ID
    ): Contato

    createContato(
      celular: String,
      telefone: String,
      email: String,
      pessoaId: ID
    ): CreateContatoResponse

    updateContato(
      id: ID!,
      celular: String,
      telefone: String,
      email: String
    ): Contato

    deleteContato(id: ID!): Boolean
  }
`
