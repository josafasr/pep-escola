/**
 * @file Descritores GraphQL para as operações sobre a tabela de medicamentos
 * @module schemas/medicamento
 * @author Josafá Santos
 */
export default `
  type Medicamento {
    id: ID
    nome: String
    dose: String
    apresentacao: ApresentacaoMedicamento
  }

  type Query {
    medicamento(id: ID!): Medicamento
    medicamentos: [Medicamento]
  }

  type Mutation {
    createMedicamento(nome: String, dose: String, apresentacaoMedicamentoId: Int): Medicamento
    updateMedicamento(id: ID!, nome: String, dose: String, apresentacaoMedicamentoId: Int): Medicamento
    deleteMedicamento(id: ID!): Int
  }
`
