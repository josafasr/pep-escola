import { createContext } from 'react'

const ConsultaContext = createContext(
  {
    acompanhante: '',
    queixaPrincipalObs: '',
    historiaDoencaAtual: '',
    queixaPrincipal: {},
    queixas: [],
    recordatorioAlimentar: [],
    indicadoresExameFisico: {},
    exameFisico: [],
    suspeitasDiagnosticas: '',
    planoConduta: ''
  }
)

export default ConsultaContext