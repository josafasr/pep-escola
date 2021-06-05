/**
 * @title Componente para criação/edição de pacientes/prontuários
 * @module src/pages/PacienteEdit
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  makeStyles,
  CssBaseline,
  CircularProgress,
  Box,
  Typography,
  Paper,
  Button,
  LinearProgress
 } from '@material-ui/core'

import PessoaForm from '../forms/PessoaForm'
import ContatoForm from '../forms/ContatoForm'
import EnderecoForm from '../forms/EnderecoForm'
import PacienteForm from '../forms/PacienteForm'
import { toDatabaseDate } from '../utils/format'
import { CREATE_WITH_INCLUDES, GET_WITH_INCLUDES } from '../graphql/paciente'

import PacienteContext from '../contexts/PacienteContext'
import PessoaContext from '../contexts/PessoaContext'
import ContatoContext from '../contexts/ContatoContext'
import contatoReducer from '../store/contato/reducer'
import { loadData } from '../store/contato/acitons'
import EnderecoContext from '../contexts/EnderecoContext'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },

  paper: {
    width: '100%',
    marginBottom: '10px'
  },

  boxFieldset: {
    borderStyle: 'none'
  },

  boxTitle: {
    paddingTop: '10px',
    fontWeight: 'bold'
  },

  buttons: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'row'
    }
  },

  button: {
    width: '100%',
    boxShadow: `0px 3px 1px -2px rgba(0,0,0,0.2),
      0px 2px 2px 0px rgba(0,0,0,0.14),
      0px 1px 5px 0px rgba(0,0,0,0.12)`,
    textTransform: 'none',
    marginBottom: '10px',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      marginRight: '10px'
    }
  }
}))

function PacienteEdit(props) {

  let history = useHistory()

  const { id } = useParams()

  const classes = useStyles()

  const [pessoa, setPessoa] = React.useState({})
  //const [contato, setContato] = React.useState({})
  const [contatoState, contatoDispatch] = React.useReducer(contatoReducer)
  const [endereco, setEndereco] = React.useState({})
  const [paciente, setPaciente] = React.useState({})

  const pessoaRef = React.useRef()
  const pacienteRef = React.useRef()
  const contatoRef = React.useRef()
  const enderecoRef = React.useRef()

  const [handleCreatePaciente] = useMutation(CREATE_WITH_INCLUDES, {
    variables: {
      prontuario: paciente.prontuario,
      rg: paciente.rg,
      cpf: paciente.cpf,
      cartaoFamilia: paciente.cartaoFamilia,
      cns: paciente.cns,
      agenteComunitario: paciente.agenteComunitario,
      encaminhadoPor: paciente.encaminhadoPor,
      unidadeSaudeId: paciente.unidadeSaude?.id,
      naturalidadeId: paciente.naturalidade?.id,
      estadoCivilId: paciente.estadoCivil?.id,
      religiaoId: paciente.religiao?.id,
      corPeleId: paciente.corPele?.id,
      escolaridadeId: paciente.escolaridade?.id,
      tempoEstudoId: paciente.tempoEstudo?.id,
      profissaoId: paciente.profissao?.id,
      situacaoProfissionalId: paciente.situacaoProfissional?.id,
      pessoa: {
        ...pessoa,
        dataNascimento: toDatabaseDate(pessoa.dataNascimento),
        contato: contatoState,
        enderecos: [{
          tipoLogradouroId: parseInt(endereco?.tipoLogradouro?.id),
          logradouro: endereco?.logradouro,
          numero: parseInt(endereco?.numero),
          bairro: endereco?.bairro,
          complemento: endereco?.complemento,
          cep: endereco?.cep,
          cidadeId: parseInt(endereco?.cidade?.id)
        }]
      }
    }
  })

  const { loading, error } = useQuery(GET_WITH_INCLUDES, {
    variables: { id },
    onCompleted: (data) => {
      setPaciente(data.paciente)
      setPessoa({
        ...data.paciente.pessoa,
        dataNascimento: new Date(`${data.paciente.pessoa.dataNascimento}T03:00:00Z`).toLocaleString("pt-BR", {dateStyle: "short"})
      })
      contatoDispatch(loadData(data.paciente.pessoa.contato))
      setEndereco(data.paciente.pessoa.enderecos[0])
    },
    skip: !id
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const pacienteResponse = await handleCreatePaciente()
    if (pacienteResponse.data.createWithIncludes.ok) {
      alert('Paciente criado com sucesso!')
      handleReset()
    } else {
      alert('Não foi possível criar o paciente :(')
    }
  }

  const handleReset = () => {
    pessoaRef.current.handleReset()
    pacienteRef.current.handleReset()
    contatoRef.current.handleReset()
    enderecoRef.current.handleReset()
    history.push('/pacientes')
  }

  if (loading) return <LinearProgress color="secondary" />
  if (error) return 'Error :('

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper} elevation={2}>
        <Box className={classes.boxFieldset} component="fieldset">
          <legend>
            <Typography className={classes.boxTitle}>Dados Pessoais</Typography>
          </legend>
          <PessoaContext.Provider value={{pessoa, setPessoa}}>
            <PessoaForm
              ref={pessoaRef}
              disabled={!!id}
            />
          </PessoaContext.Provider>
  
          <PacienteContext.Provider value={[paciente, setPaciente]}>
            <PacienteForm
              ref={pacienteRef}
              disabled={!!id}
            />
          </PacienteContext.Provider>
        </Box>
      </Paper>

      <Paper className={classes.paper} elevation={2}>
        <Box className={classes.boxFieldset} component="fieldset">
          <legend>
            <Typography className={classes.boxTitle}>Contato</Typography>
          </legend>
          <ContatoContext.Provider value={{contatoState, contatoDispatch}}>
            <ContatoForm
              ref={contatoRef}
              disabled={!!id}
            />
          </ContatoContext.Provider>
        </Box>
      </Paper>

      <Paper className={classes.paper} elevation={2}>
        <Box className={classes.boxFieldset} component="fieldset">
          <legend>
            <Typography className={classes.boxTitle}>Endereço</Typography>
          </legend>
          <EnderecoContext.Provider value={{endereco, setEndereco}}>
            <EnderecoForm
              ref={enderecoRef}
              disabled={!!id}
            />
          </EnderecoContext.Provider>
        </Box>
      </Paper>

      <div className={classes.buttons}>
        <Button
          className={classes.button}
          type="reset"
          size="small"
          onClick={handleReset}
        >{id ? 'Voltar' : 'Cancelar'}</Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
          disabled={id ? true : false}
        >Salvar</Button>
      </div>
    </div>
  )
}
export default PacienteEdit