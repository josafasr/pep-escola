/**
 * @file Descritores GraphQL para as operações sobre a alteração agendamento
 * @module schemas/alteracao-agendamento
 * @author Marcos Porto 
 */

export default `
type AlteracaoAgendamento {
    data_hora_anterior: String
    data_hora_proxima: String
    motivo: String
    agendamento: Agendamento
    usuario: Usuario
}

type CreateAlteracaoAgendamentoResponse {
    ok: Boolean
    alteracaoAgendamento: AlteracaoAgendamento
    errors: [Error]
  }

type Query {
    alteracaoAgendamento(id: ID!): AlteracaoAgendamento
    alteracaoAgendamentos: [AlteracaoAgendamento]
}

type Mutation{
    createAlteracaoAgendamento(insercao: Boolean,
        data_hora_anterior: String,
        data_hora_proxima: String,
        motivo: String,
        agendamentoId: Int,
        usuarioId: Int): CreateAlteracaoAgendamentoResponse
    
    updateAlteracaoAgendamento(id: ID!,
        data_hora_anterior: String,
        data_hora_proxima: String,
        motivo: String,
        agendamentoId: Int,
        usuarioId: Int): CreateAlteracaoAgendamentoResponse
        
    deleteAlteracaoAgendamento(id: ID!): Boolean
}
`