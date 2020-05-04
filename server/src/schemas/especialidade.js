/**
 * @file Descritores GraphQL para as operações sobre a tabela de especialidade
 * @module schemas/especialidade
 * @author Marcos Porto 
 */
export default `
  type Especialidade {
    id: ID
    nome: String
    descricao: String
  }

  type CreateEspecialidadeResponse {
    ok: Boolean
    especialidade: Especialidade
    errors: [Error]
  }

  type Query {
    especialidades: [Especialidade]
    especialidade(id: ID!): Especialidade
  }

  type Mutation {
    createEspecialidade(nome: String, descricao: String): CreateEspecialidadeResponse
    updateEspecialidade(id: ID!, nome: String, descricao: String): CreateEspecialidadeResponse
    deleteEspecialidade(id: ID!): Boolean
  }
`