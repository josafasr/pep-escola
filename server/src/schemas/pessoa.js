/**
 * @file Descritores GraphQL para as operações sobre a tabela de pessoas
 * @module schemas/pessoa
 * @author Josafá Santos
 */
export default `
  type Pessoa {
    id: ID
    nome: String
    dataNascimento: String
    sexo: Int
    nacionalidade: Pais
    naturalidade: Cidade
    estadoCivil: EstadoCivil
    religiao: Religiao
    corPele: CorPele
    escolaridade: Escolaridade
    profissao: Profissao
    situacaoProfissional: SituacaoProfissional
    endereco: Endereco
  }

  type Query {
    pessoas: [Pessoa]
    pessoa(id: ID!): Pessoa
  }

  type Mutation {
    createPessoa(
      nome: String!,
      dataNascimento: String,
      sexo: Int,
      nacionalidadeId: Int,
      naturalidadeId: Int,
      estadoCivilId: Int,
      religiaoId: Int,
      corPeleId: Int,
      escolaridadeId: Int,
      profissaoId: Int,
      situacaoProfissionalId: Int,
      enderecoId: Int
    ): Pessoa

    updatePessoa(
      id: ID!,
      nome: String,
      dataNascimento: String,
      sexo: Int,
      email: String,
      nacionalidadeId: Int,
      naturalidadeId: Int,
      estadoCivilId: Int,
      religiaoId: Int,
      corPeleId: Int,
      escolaridadeId: Int,
      profissaoId: Int,
      situacaoProfissionalId: Int,
      enderecoId: Int
    ): Pessoa

    deletePessoa(id: ID!): Int
  }
`
