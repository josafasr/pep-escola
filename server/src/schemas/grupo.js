/**
 * @file Descritores GraphQL para as operações sobre a tabela de grupos
 * @module schemas/grupo
 * @author Josafá Santos
 */
export default `
  type Grupo {
    id: ID
    nome: String
    usuarios: [Grupo]
  }

  type Query {
    grupo(id: ID!): Grupo
    grupos: [Grupo]
  }

  type Mutation {
    createGrupo(nome: String): Grupo
    updateGrupo(id: ID!, nome: String): Grupo
    deleteGrupo(id: ID!): Int
  }
`
