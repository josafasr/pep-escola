import { createContext } from 'react'

const ContatoContext = createContext(
  {
    celular: '',
    telefone: '',
    email: ''
  }
)

export default ContatoContext