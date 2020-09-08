import { createContext } from 'react'

const ConsultaContext = createContext(
  {
    acompanhante: '',
    queixaPrincipal: {},
    queixaPrincipalObs: '',
    historiaDoencaAtual: '',
    queixas: []
  }
)

export default ConsultaContext