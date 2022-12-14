/**
 * @description Componente para criação/edição de pacientes/prontuários
 * @module src/pages/PacienteEdit
 * @author Josafá Santos dos Reis
 */

import React, { useEffect } from 'react'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  makeStyles,
  CssBaseline,
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
import { CREATE_WITH_INCLUDES, UPDATE_PACIENTE, GET_WITH_INCLUDES } from '../graphql/paciente'

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

const PacienteEdit = () => {

  const classes = useStyles()
  let history = useHistory()
  const { id } = useParams()
  const { path } = useRouteMatch()
  const editar = path === '/pacientes/:id/editar'
  // const isProntuario = path === '/pacientes/:id/prontuario'
  // const showProntuarioButton = (!!id && !editar && !isProntuario)
  const showEditarButton = (!id || editar)

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
      // prontuario: paciente.prontuario,
      rg: paciente.rg,
      cpf: paciente.cpf,
      cartaoFamilia: paciente.cartaoFamilia,
      cns: paciente.cns,
      agenteComunitario: paciente.agenteComunitario,
      // encaminhadoPor: paciente.encaminhadoPor,
      unidadeSaudeId: paciente.unidadeSaude?.id,
      nacionalidadeId: paciente.nacionalidade?.id,
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

  const [handleUpdatePaciente] = useMutation(UPDATE_PACIENTE)

  const { loading, error, refetch } = useQuery(GET_WITH_INCLUDES, {
    variables: { id },
    onCompleted: (data) => {
      setPaciente(data.paciente)
      setPessoa({
        ...data.paciente.pessoa,
        //dataNascimento: new Date(`${data.paciente.pessoa.dataNascimento}T03:00:00Z`).toLocaleString("pt-BR", {dateStyle: "short"})
        dataNascimento: data.paciente.pessoa.dataNascimento !== null ?
          new Date(`${data.paciente.pessoa.dataNascimento}T03:00:00Z`).toLocaleDateString("pt-BR") :
          null
      })
      contatoDispatch(loadData(data.paciente.pessoa.contato))
      setEndereco(data.paciente.pessoa.enderecos[0])
    },
    notifyOnNetworkStatusChange: true,
    skip: !id
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!editar) {
      const pacienteResponse = await handleCreatePaciente()
      if (pacienteResponse.data.createWithIncludes.ok) {
        alert('Paciente criado com sucesso!')
        handleReset()
      } else {
        alert('Não foi possível criar o paciente :(')
      }
    } else {
      delete pessoa['__typename']
      delete contatoState['__typename']
      delete endereco['__typename']
      const updateResponse = await handleUpdatePaciente({
        variables: {
          id,
          prontuario: paciente.prontuario,
          rg: paciente.rg,
          cpf: paciente.cpf,
          cartaoFamilia: paciente.cartaoFamilia,
          cns: paciente.cns,
          agenteComunitario: paciente.agenteComunitario,
          // encaminhadoPor: paciente.encaminhadoPor,
          unidadeSaudeId: paciente.unidadeSaude?.id,
          nacionalidadeId: paciente.nacionalidade?.id,
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
              id: parseInt(endereco?.id),
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
      if (updateResponse.data.updatePaciente.ok) {
        alert('Paciente atualizado com sucesso!')
        handleBack()
      } else {
        alert('Não foi possível atualizar o paciente :(')
      }
    }
  }

  const goToEdit = () => {
    // pacienteOrig = { ...paciente }
    // console.log(pacienteOrig);
    history.push(`/pacientes/${id}/editar`)
  }

  /* const goToProntuario = () => {
    history.push(`/pacientes/${id}/prontuario`)
  } */

  const handleReset = () => {
    pessoaRef.current.handleReset()
    pacienteRef.current.handleReset()
    contatoRef.current.handleReset()
    enderecoRef.current.handleReset()
    history.push('/pacientes')
  }

  const handleBack = () => {
    // console.log(pacienteOrig);
    // setPaciente(pacienteOrig)
    history.goBack()
  }

  useEffect(() => {
    if (id)
      refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, refetch])

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
              disabled={!!id && !editar}
            />
          </PessoaContext.Provider>
  
          <PacienteContext.Provider value={[paciente, setPaciente]}>
            <PacienteForm
              ref={pacienteRef}
              disabled={!!id && !editar}
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
              disabled={!!id && !editar}
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
              disabled={!!id && !editar}
            />
          </EnderecoContext.Provider>
        </Box>
      </Paper>

      <div className={classes.buttons}>
        <Button
          className={classes.button}
          type="reset"
          size="small"
          onClick={!id ? handleReset : handleBack}
        >
          {id && !editar ? 'Voltar' : 'Cancelar'}
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={showEditarButton ? handleSubmit : goToEdit}
        >
          {showEditarButton ? 'Salvar' : 'Editar'}
        </Button>

        {/* {showProntuarioButton && <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={goToProntuario}
        >
          Prontuário
        </Button>} */}
      </div>
    </div>
  )
}
export default PacienteEdit