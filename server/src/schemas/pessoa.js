/**
 * @file Descritores GraphQL para as operações sobre a tabela de pessoas
 * @module src/schemas/pessoa
 * @author Josafá Santos dos Reis
 */
export default `
  type Pessoa {
    id: ID
    nome: String
    dataNascimento: String
    sexo: String
    contato: Contato
    enderecos: [Endereco]
  }

  input PessoaInput {
    id: ID
    nome: String
    dataNascimento: String
    sexo: String
    contato: ContatoInput
    enderecos: [EnderecoInput]
  }

  type PessoaResponse {
    ok: Boolean
    pessoa: Pessoa
    errors: [Error]
  }

  type Query {
    pessoas: [Pessoa]
    pessoa(id: ID!): Pessoa
  }

  type Mutation {
    createPessoa(
      nome: String!,
      dataNascimento: String,
      sexo: String,
      contatoId: Int,
      enderecos: [Int]
    ): PessoaResponse

    updatePessoa(
      id: ID!,
      nome: String,
      dataNascimento: String,
      sexo: String,
      contatoId: Int,
      enderecos: [Int]
    ): PessoaResponse

    deletePessoa(id: ID!): Boolean
  }
`
