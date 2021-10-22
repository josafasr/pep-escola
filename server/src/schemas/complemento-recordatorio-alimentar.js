/**
 * @description Descritores GraphQL para as operações sobre a tabela de complemento do recordatório alimentar
 * @module src/schemas/complemento-recordatorio-alimentar
 * @author Marcos Porto, Josafá Santos dos Reis
 */

export default `
  type ComplementoRecordatorioAlimentar {
    id: ID
    complemento: String
    consulta: Consulta
  }

  input ComplementoRecordatorioAlimentarInput {
    complemento: String
  }

  # type ComplementoRecordatorioAlimentarResponse {
  #   ok: Boolean
  #   recordatorioAlimentar: ComplementoRecordatorioAlimentar
  #   errors: [Error]
  # }

  type Query {
    complementoRecordatorioAlimentar(id: ID!): ComplementoRecordatorioAlimentar
    complementosRecordatorioAlimentar: [ComplementoRecordatorioAlimentar]
  }

  # type Mutation {
  #   createComplementoRecordatorioAlimentar(
  #     quantidade: Int,
  #     consultaId: ID!,
  #     tipoRefeicaoId: ID!,
  #     alimentoId: ID,
  #     alimento: AlimentoInput,
  #   ): ComplementoRecordatorioAlimentarResponse

  #   updateComplementoRecordatorioAlimentar(
  #     id: ID!,
  #     quantidade: Int,
  #     consultaId: ID,
  #     tipoRefeicaoId: ID,
  #     alimentoId: ID
  #   ): ComplementoRecordatorioAlimentarResponse

  #   deleteComplementoRecordatorioAlimentar(id: ID!): Boolean
  # }
  `