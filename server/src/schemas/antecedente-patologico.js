/**
 * @title Descritores GraphQL para a tabela de antecedentes patológicos
 * @module src/schemas/antecedente-patologico
 * @author Josafá Santos dos Reis
 */

export default `
  type AntecedentePatologico {
    id: Int
    patologia: Patologia
    tempoDiagnostico: String
  }

  input AntecedentePatologicoInput {
    pacienteId: ID
    patologiaId: ID
    tempoDiagnostico: String
  }
`