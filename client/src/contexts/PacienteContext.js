import { createContext } from 'react'

const PacienteContext = createContext(
  {
    prontuario: '',
    rg: '',
    cpf: '',
    cartaoFamilia: '',
    cns: '',
    agenteComunitario: '',
    encaminhadoPor: '',
    unidadeSaude: {},
    // nacionalidade: '',
    naturalidade: {},
    estadoCivil: {},
    religiao: {},
    corPele: {},
    escolaridade: {},
    tempoEstudo: {},
    profissao: {},
    situacaoProfissional: {}
  }
)

export default PacienteContext