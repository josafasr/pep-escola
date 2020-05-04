/**
 * @file Descritores GraphQL para as operações sobre a tabela de agendamento
 * @module schemas/agendamento
 * @author Marcos Porto 
 */

export default `
type Agendamento {
    insercao: Boolean
    retorno: Boolean
    ambulatorio: String
    data_horario: String
    confirmado: Boolean
    status: String
    cancelado: Boolean
    paciente: Paciente
    usuario: Usuario
}

type CreateAgendamentoResponse {
    ok: Boolean
    agendamento: Agendamento
    errors: [Error]
  }

type Query {
    agendamento(id: ID!): Agendamento
    agendamentos: [Agendamento]
}

type Mutation{
    createAgendamento(insercao: Boolean,
        retorno: Boolean,
        ambulatorio: String,
        data_horario: String,
        confirmado: Boolean,
        status: String,
        cancelado: Boolean,
        pacienteId: Int, 
        usuarioId: Int): CreateAgendamentoResponse
    
        updateAgendamento(id: ID!,
        insercao: Boolean,
        retorno: Boolean,
        ambulatorio: String,
        data_horario: String,
        confirmado: Boolean,
        status: String,
        cancelado: Boolean,
        pacienteId: Int, 
        usuarioId: Int): CreateAgendamentoResponse
        
        deleteAgendamento(id: ID!): Boolean
}
`