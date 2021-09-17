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

    type UnidadeSaudeResponse {
        ok: Boolean
        unidadeSaude: UnidadeSaude
        errors: [Error]
      }

    type Query {
        unidadeSaude(id: ID!): UnidadeSaude
        unidadesSaude: [UnidadeSaude]
        unidadesSaudeByText(text: String): [UnidadeSaude]
    }

    type Mutation{
        createUnidadeSaude(nome: String, cnes: String): UnidadeSaudeResponse
        updateUnidadeSaude(id: ID!, nome: String, cnes: String): UnidadeSaudeResponse
        deleteUnidadeSaude(id: ID!): Boolean
    }
`