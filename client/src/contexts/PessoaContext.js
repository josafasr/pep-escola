import { createContext } from 'react'

const PessoaContext = createContext(
  {
    nome: '',
    dataNascimento: '',
    sexo: ''
  }
)

export default PessoaContext