import { createContext } from 'react'

const EnderecoContext = createContext(
  {
    tipoLogradouro: {},
    logradouro: '',
    numero: '',
    bairro: '',
    complemento: '',
    cep: '',
    cidade: {}
  }
)

export default EnderecoContext