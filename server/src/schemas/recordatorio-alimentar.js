/**
 * @file Descritores GraphQL para as operações sobre a tabela de recordatorio alimentar
 * @author Marcos Porto 
 */

export default `
type RecordatorioAlimentar {
    id: ID
    nome: String
    tipoRefeicaoId: Int
}

type Query {
    recordatorioAlimentar(id: ID!): RecordatorioAlimentar
    recordatoriosAlimentar: [RecordatorioAlimentar]
}

type Mutation{
    createRecordatorioAlimentar(nome: String, tipoRefeicaoId: Int): RecordatorioAlimentar
    updateRecordatorioAlimentar(id: ID!, nome: String, tipoRefeicaoId: Int): RecordatorioAlimentar
    deleteRecordatorioAlimentar(id: ID!): Int
}
`