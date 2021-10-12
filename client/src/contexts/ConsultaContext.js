import { createContext } from 'react'

const ConsultaContext = createContext(
  {
    acompanhante: '',
    responsaveis: '',
    encaminhadoPor: '',
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