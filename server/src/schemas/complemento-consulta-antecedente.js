/**
 * @description Descritores GraphQL para as operações sobre a tabela complementos de antecedentes
 * @module src/schemas/complemento-paciente-antecedente
 * @author Josafá Santos dos Reis
 */

import { gql } from 'apollo-server-express'

export default gql`
  type ComplementoConsultaAntecedente {
    id: Int
    complemento: String
    consulta: Consulta
    tipoAntecedente: TipoAntecedente
  }

  input ComplementoConsultaAntecedenteInput {
    # id: ID
    complemento: String
    tipoAntecedenteId: Int
  }

  type ComplementoConsultaAntecedenteResponse {
    ok: Boolean
    complementoConsultaAntecedente: ComplementoConsultaAntecedente
    errors: [Error]
  }

  type Query {
    complementoConsultaAntecedente(id: ID!): ComplementoConsultaAntecedente
    complementosConsultaAntecedente: [ComplementoConsultaAntecedente]
    complementosAntecedentesByConsulta(consultaId: ID!): [ComplementoConsultaAntecedente]
  }

  type Mutation{
    createComplementoConsultaAntecedente(complemento: String, consultaId: ID, tipoAntecedenteId: ID): ComplementoConsultaAntecedenteResponse
    updateComplementoConsultaAntecedente(id: ID!, complemento: String): ComplementoConsultaAntecedenteResponse
  }
`