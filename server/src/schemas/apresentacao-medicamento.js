/**
 * @file Descritores GraphQL para as operações sobre a tabela de apresentações de medicamento
 * @module schemas/apresentacao-medicamento
 * @author Josafá Santos
 */
export default `
  type ApresentacaoMedicamento {
    id: ID
    nome: String
    medicamentos: [Medicamento]
  }

  type Query {
    apresentacaoMedicamento(id: ID!): ApresentacaoMedicamento
    apresentacoesMedicamentos: [ApresentacaoMedicamento]
  }

  type Mutation {
    createApresentacaoMedicamento(nome: String): ApresentacaoMedicamento
    updateApresentacaoMedicamento(id: ID!, nome: String): ApresentacaoMedicamento
    deleteApresentacaoMedicamento(id: ID!): Int
  }
`
