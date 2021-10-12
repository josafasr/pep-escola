/**
 * @description Descritores GraphQL para as operações sobre a tabela de grupos
 * @module src/schemas/grupo
 * @author Josafá Santos dos Reis
 */
export default `
  type Grupo {
    id: ID
    nome: String
    descricao: String
    usuarios: [Usuario]
    permissoes: [Permissao]
  }

  type GrupoResponse {
    ok: Boolean
    grupo: Grupo
    errors: [Error]
  }

  type Query {
    grupo(id: ID!): Grupo
    grupos: [Grupo]
  }

  type Mutation {
    createGrupo(nome: String, descricao: String): GrupoResponse
    updateGrupo(id: ID!, nome: String, descricao: String, permissoes: [ID]): GrupoResponse
    deleteGrupo(id: ID!): Int
  }
`
