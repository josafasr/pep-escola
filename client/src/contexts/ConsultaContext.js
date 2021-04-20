import { createContext } from 'react'

const ConsultaContext = createContext(
  {
    acompanhante: '',
    queixaPrincipalObs: '',
    historiaDoencaAtual: '',
    queixaPrincipal: {},
    queixas: [],
    complementosQaueixas: [],
    recordatorioAlimentar: [],
    indicadoresExameFisico: {},
    exameFisico: [],
    suspeitasDiagnosticas: '',
    planoConduta: ''
  }
)

export default ConsultaContext