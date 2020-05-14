/**
 * @file Descritores GraphQL para as operações sobre a tabela de patologia
 * @module schemas/patologia
 * @author Marcos Porto 
 */

export default `
type Patologia {
    id: ID
    nome: String
    descricao: String
    tipoPatologia: TipoPatologia
}

type CreatePatologiaResponse {
    ok: Boolean
    patologia: Patologia
    errors: [Error]
  }

type Query {
    patologia(id: ID!): Patologia
    patologias: [Patologia]
}

type Mutation{
    createPatologia(nome: String, descricao: String, tipoPatologiaId: Int): CreatePatologiaResponse
    updatePatologia(id: ID!, nome: String, tipoPatologiaId: Int): CreatePatologiaResponse
    deletePatologia(id: ID!): Boolean
}
`