import { createContext } from 'react'

const UsuarioContext = createContext(
  {
    nome: '',
    senha: ''
  }
)

export default UsuarioContext