/**
 * @title Descritores GraphQL para as operações sobre a tabela de tipo de refeição
 * @module src/schemas/tipo-refeicao
 * @author Marcos Porto, Josafá Santos dos Reis
 */

export default `
  type TipoRefeicao {
    id: ID
    nome: String
  }

  input TipoRefeicaoInput {
    id: ID
    nome: String
  }

  type TipoRefeicaoResponse {
    ok: Boolean
    tipoRefeicao: TipoRefeicao
    errors: [Error]
  }

  type Query {
    tipoRefeicao(id: ID!): TipoRefeicao
    tiposRefeicao: [TipoRefeicao]
  }

  type Mutation{
    createTipoRefeicao(nome: String): TipoRefeicaoResponse
    updateTipoRefeicao(id: ID!, nome: String): TipoRefeicaoResponse
    deleteTipoRefeicao(id: ID!): Boolean
  }
  `