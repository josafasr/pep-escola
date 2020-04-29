/**
 * @file Descritores GraphQL para as operações sobre a tabela de unidades de saúde
 * @module schemas/unidade-saude
 * @author Marcos Porto 
 */

 export default `
    type UnidadeSaude {
        id: ID
        nome: String
        cnes: String
    }

    type Query {
        unidadeSaude(id: ID!): UnidadeSaude
        unidadesSaude: [UnidadeSaude]
    }

    type Mutation{
        createUnidadeSaude(nome: String, cnes: String): UnidadeSaude
        updateUnidadeSaude(id: ID!, nome: String, cnes: String): UnidadeSaude
        deleteUnidadeSaude(id: ID!): Int
    }
`