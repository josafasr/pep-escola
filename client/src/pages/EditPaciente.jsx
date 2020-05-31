/**
 * Componente para criação/edição de pacientes/prontuários
 * @module src/pages/PacienteList
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

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

  if (pacienteData.loading) return 'Carregando...'

  const handleChangePessoa = data => {
    setPessoa(data)
  }

  const handleChangeContato = data => {
    setContato(data)
  }

  const handleChangeEndereco = data => {
    setEndereco(data)
  }

  const handleChangePaciente = data => {
    setPaciente(data)
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper} elevation={2}>
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
      </Paper>

      <Paper className={classes.paper} elevation={2}>
        <ContatoForm
          contatoData={pacienteData.data?.paciente?.pessoa?.contato}
          onChange={handleChangeContato}
          ref={contatoRef}
        />
      </Paper>

      <Paper className={classes.paper} elevation={2}>
        <EnderecoForm
          enderecoData={pacienteData.data?.paciente?.pessoa?.enderecos[0]}
          onChange={handleChangeEndereco}
          ref={enderecoRef}
        />
      </Paper>

      <div className={classes.buttons}>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          size="small"
          onClick={handleSubmit}
          disabled={id ? true : false}
        >Salvar</Button>
        <Button
          className={classes.button}
          type="reset"
          variant="outlined"
          color="secondary"
          size="small"
          onClick={handleReset}
        >{id ? 'Voltar' : 'Cancelar'}</Button>
      </div>
    </div>
  )
}
export default EditPaciente