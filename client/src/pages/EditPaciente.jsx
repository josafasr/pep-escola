/**
 * Componente para criação/edição de pacientes/prontuários
 * @module src/pages/PacienteList
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  makeStyles,
  CssBaseline,
  Box,
  Typography,
  Paper,
  Button
 } from '@material-ui/core'

import PessoaForm from '../forms/PessoaForm'
import ContatoForm from '../forms/ContatoForm'
import EnderecoForm from '../forms/EnderecoForm'
import PacienteForm from '../forms/PacienteForm'
import { toDatabaseDate } from '../utils/format'
import { CREATE_WITH_INCLUDES, GET_WITH_INCLUDES } from '../graphql/paciente'

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
    // marginTop: '10px',
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

function EditPaciente(props) {

  let history = useHistory()

  const { id } = useParams()

  const classes = useStyles()

  const [pessoa, setPessoa] = React.useState({})
  const [contato, setContato] = React.useState({})
  const [endereco, setEndereco] = React.useState({})
  const [paciente, setPaciente] = React.useState({})

  const pessoaRef = React.useRef()
  const pacienteRef = React.useRef()
  const contatoRef = React.useRef()
  const enderecoRef = React.useRef()

  const [handleCreatePaciente] = useMutation(CREATE_WITH_INCLUDES, {
    variables: {
      ...paciente,
      pessoa: {
        ...pessoa,
        dataNascimento: toDatabaseDate(pessoa.dataNascimento),
        contato: contato,
        enderecos: [endereco]
      }
    }
  })

  const pacienteData = useQuery(GET_WITH_INCLUDES, {
    variables: { id },
    // onCompleted: (data) => {
    //   setPaciente(data)
      // setPessoa(data.paciente.pessoa)
      // setEndereco(data.paciente.pessoa.endereco[0])
      // setPessoa(data.paciente.pessoa.contato)
    //   console.log(paciente)
    // },
    skip: !id
  })

  const handleChangePessoa = data => {
    setPessoa(data)
  }

  const handleChangeContato = data => {
    setContato(data)
  }

  const handleChangeEndereco = data => {
    setEndereco(data)
  }

  const handleChangePaciente = pacienteField => {
    const { name, value } = pacienteField
    setPaciente({
      ...paciente,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const pacienteResponse = await handleCreatePaciente()
    if (pacienteResponse.data.createWithIncludes.ok) {
      // console.log(pacienteResponse.data.createWithIncludes.paciente)
      alert('Paciente criado com sucesso!')
      handleReset()
    } else {
      // console.log(pacienteResponse.data.createWithIncludes.errors)
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

  if (pacienteData.loading) return 'Carregando...'

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper} elevation={2}>
        <Box className={classes.boxFieldset} component="fieldset">
          <legend>
            <Typography className={classes.boxTitle}>Dados Pessoais</Typography>
          </legend>
          <PessoaForm
            pessoaData={pacienteData.data?.paciente?.pessoa}
            onChange={handleChangePessoa}
            ref={pessoaRef}
          />

          <PacienteForm
            pacienteData={pacienteData.data?.paciente}
            onChange={handleChangePaciente}
            ref={pacienteRef}
          />
        </Box>
      </Paper>

      <Paper className={classes.paper} elevation={2}>
        <Box className={classes.boxFieldset} component="fieldset">
          <legend>
            <Typography className={classes.boxTitle}>Contato</Typography>
          </legend>
          <ContatoForm
            contatoData={pacienteData.data?.paciente?.pessoa?.contato}
            onChange={handleChangeContato}
            ref={contatoRef}
          />
        </Box>
      </Paper>

      <Paper className={classes.paper} elevation={2}>
        <Box className={classes.boxFieldset} component="fieldset">
          <legend>
            <Typography className={classes.boxTitle}>Endereço</Typography>
          </legend>
          <EnderecoForm
            enderecoData={pacienteData.data?.paciente?.pessoa?.enderecos[0]}
            onChange={handleChangeEndereco}
            ref={enderecoRef}
          />
        </Box>
      </Paper>

      <div className={classes.buttons}>
        <Button
          className={classes.button}
          type="reset"
          //variant="outlined"
          //color="secondary"
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
export default EditPaciente