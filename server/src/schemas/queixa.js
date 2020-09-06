/**
 * @title Descritores GraphQL para as operações sobre a tabela de queixa
 * @module src/schemas/queixa
 * @author Marcos Porto 
 */

export default `
    type Queixa {
        id: ID
        nome: String
        tipoQueixa: TipoQueixa
        consultas: [Consulta]
        queixaPrincipalConsultas: [Consulta]
    }

    type QueixaResponse {
        ok: Boolean
        queixa: Queixa
        errors: [Error]
    }

    type Query {
        queixa(id: ID!): Queixa
        queixas: [Queixa]
        queixasByText(text: String!): [Queixa]
    }

    type Mutation{
        createQueixa(nome: String, tipoQueixaId: ID!): QueixaResponse
        updateQueixa(id: ID!, nome: String, tipoQueixaId: Int): QueixaResponse
        deleteQueixa(id: ID!): Boolean
    }
`