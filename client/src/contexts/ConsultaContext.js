import { createContext } from 'react'

const ConsultaContext = createContext(
  {
    acompanhante: '',
    queixaPrincipal: {},
    queixaPrincipalObs: '',
    historiaDoencaAtual: '',
    recordatorioAlimentar: [],
    queixas: [],
    suspeitasDiagnosticas: '',
    planoConduta: ''
  }
)

export default ConsultaContext