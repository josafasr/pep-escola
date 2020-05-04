/**
 * @file Descritores GraphQL para as operações sobre a tabela de queixa
 * @module schemas/queixa
 * @author Marcos Porto 
 */

export default `
type Queixa {
    id: ID
    nome: String
    tipoQueixa: TipoQueixa
}

type CreateQueixaResponse {
    ok: Boolean
    queixa: Queixa
    errors: [Error]
  }

type Query {
    queixa(id: ID!): Queixa
    queixas: [Queixa]
}

type Mutation{
    createQueixa(nome: String, tipoQueixaId: Int): CreateQueixaResponse
    updateQueixa(id: ID!, nome: String, tipoQueixaId: Int): CreateQueixaResponse
    deleteQueixa(id: ID!): Boolean
}
`