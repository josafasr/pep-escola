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

  type Query {
    especialidades: [Especialidade]
    especialidade(id: ID!): Especialidade
  }

  type Mutation {
    createEspecialidade(nome: String, descricao: String): Especialidade
    updateEspecialidade(id: ID!, nome: String, descricao: String): Especialidade
    deleteEspecialidade(id: ID!): Int
  }
`