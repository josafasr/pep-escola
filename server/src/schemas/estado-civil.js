/**
 * @file Descritores GraphQL para as operações sobre a tabela de estados civis
 * @module schemas/estado-civil
 * @author Josafá Santos
 */
export default `
  type EstadoCivil {
    id: ID
    nome: String
  }

  type Query {
    estadosCivil: [EstadoCivil]
    estadoCivil(id: ID!): EstadoCivil
  }

  type Mutation {
    createEstadoCivil(nome: String): EstadoCivil
    updateEstadoCivil(id: ID!, nome: String): EstadoCivil
    deleteEstadoCivil(id: ID!): Int
  }
`
