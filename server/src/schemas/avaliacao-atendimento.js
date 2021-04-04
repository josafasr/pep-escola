/**
 * @title Descritores GraphQL para as operações sobre a tabela de avaliação de atendimento
 * @module src/schemas/avaliacao-atendimento
 * @author Josafá Santos dos Reis
 */

export default `
  type AvaliacaoAtendimento {
    id: ID
    nota: Float
    avaliador: Usuario
    consulta: Consulta
  }

  type AvaliacaoAtendimentoResponse {
    ok: Boolean
    avaliacaoAtendimento: AvaliacaoAtendimento
    errors: [Error]
  }

  type Query {
    avaliacaoAtendimento(consultaId: ID!): AvaliacaoAtendimento
    avaliacoesAtendimentoByAvaliador(usuarioId: ID!): [AvaliacaoAtendimento]
    avaliacoesAtendimento: [AvaliacaoAtendimento]
  }

  type Mutation {
    createAvaliacaoAtendimento(nota: Float!, consultaId: ID!, usuarioId: ID!): AvaliacaoAtendimentoResponse
  }
`