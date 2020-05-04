/**
 * @file Descritores GraphQL para as operações sobre a tabela de tipo de refeição
 * @module schemas/tipo-refeicao
 * @author Marcos Porto 
 */

export default `
type TipoRefeicao {
    id: ID
    nome: String
}

type CreateTipoRefeicaoResponse {
    ok: Boolean
    tipoRefeicao: TipoRefeicao
    errors: [Error]
  }

type Query {
    tipoRefeicao(id: ID!): TipoRefeicao
    tiposRefeicao: [TipoRefeicao]
}

type Mutation{
    createTipoRefeicao(nome: String): CreateTipoRefeicaoResponse
    updateTipoRefeicao(id: ID!, nome: String): CreateTipoRefeicaoResponse
    deleteTipoRefeicao(id: ID!): Boolean
}
`