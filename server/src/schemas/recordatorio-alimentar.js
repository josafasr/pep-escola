/**
 * @title Descritores GraphQL para as operações sobre a tabela de recordatório alimentar
 * @module src/schemas/recordatorio-alimentar
 * @author Marcos Porto, Josafá Santos dos Reis
 */

export default `
  type RecordatorioAlimentar {
    id: ID
    quantidade: Int
    consulta: Consulta
    tipoRefeicao: TipoRefeicao
    alimento: Alimento
  }

  input RecordatorioAlimentarInput {
    quantidade: Int
    tipoRefeicaoId: ID
    tipoRefeicao: TipoRefeicaoInput
    alimentoId: ID
    alimento: AlimentoInput
  }

  type RecordatorioAlimentarResponse {
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
      alimentoId: ID,
      alimento: AlimentoInput,
    ): RecordatorioAlimentarResponse

    updateRecordatorioAlimentar(
      id: ID!,
      quantidade: Int,
      consultaId: ID,
      tipoRefeicaoId: ID,
      alimentoId: ID
    ): RecordatorioAlimentarResponse

    deleteRecordatorioAlimentar(id: ID!): Boolean
  }
  `