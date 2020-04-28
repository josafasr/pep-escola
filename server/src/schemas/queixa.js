/**
 * @file Descritores GraphQL para as operações sobre a tabela de queixa
 * @module schemas/queixa
 * @author Marcos Porto 
 */

export default `
type Queixa {
    id: ID
    nome: String
    tipo_queixa_id: Int
}

type Query {
    queixa(id: ID!): Queixa
    queixas: [Queixa]
}

type Mutation{
    createQueixa(nome: String, tipo_queixa_id: Int): Queixa
    updateQueixa(id: ID!, nome: String, tipo_queixa_id: Int): Queixa
    deleteQueixa(id: ID!): Int
}
`