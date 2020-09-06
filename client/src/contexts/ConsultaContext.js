import { createContext } from 'react'

const ConsultaContext = createContext(
  {
    acompanhante: '',
    queixaPrincipal: {},
    queixaPrincipalObs: '',
    historiaDoencaAtual: ''
  }
)

export default ConsultaContext