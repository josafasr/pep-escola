/**
 * @file Descritores GraphQL para as operações sobre a tabela de recordatorio alimentar
 * @module src/schemas/recordatorio-alimentar
 * @author Marcos Porto 
 */

export default `
type RecordatorioAlimentar {
    id: ID
    quantidade: Int
    tipoRefeicao: TipoRefeicao
    alimento: Alimento
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

type Mutation {
  createRecordatorioAlimentar(
    quantidade: Int,
    consultaId: ID!,
    tipoRefeicaoId: ID!,
    alimentoId: ID!
  ): CreateRecordatorioAlimentarResponse

  updateRecordatorioAlimentar(
    id: ID!,
    quantidade: Int,
    consultaId: ID,
    tipoRefeicaoId: ID,
    alimentoId: ID
  ): RecordatorioAlimentar

    deleteRecordatorioAlimentar(id: ID!): Boolean
}
`