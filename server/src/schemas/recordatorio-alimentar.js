/**
 * @file Descritores GraphQL para as operações sobre a tabela de recordatorio alimentar
 * @author Marcos Porto 
 */

export default `
type RecordatorioAlimentar {
    id: ID
    nome: String
    tipoRefeicao: TipoRefeicao
}

type CreateRecordatorioAlimentarResponse {
    ok: Boolean
    recordatorioAlimentar: RecordatorioAlimentar
    errors: [Error]
  }

type Query {
    recordatorioAlimentar(id: ID!): RecordatorioAlimentar
    recordatoriosAlimentar: [RecordatorioAlimentar]
}

type Mutation{
   createRecordatorioAlimentar(nome: String, tipoRefeicaoId: Int): CreateRecordatorioAlimentarResponse
    updateRecordatorioAlimentar(id: ID!, nome: String, tipoRefeicaoId: Int): RecordatorioAlimentar
    deleteRecordatorioAlimentar(id: ID!): Boolean
}
`