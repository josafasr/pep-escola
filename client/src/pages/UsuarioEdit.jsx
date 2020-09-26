import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  CssBaseline,
  Paper,
  Box,
  Typography,
  Button
} from '@material-ui/core'

import { useStyles } from '../styles/usuario'
import { toDatabaseDate } from '../utils/format'

import { GET_WITH_INCLUDES, CREATE_WITH_INCLUDES } from '../graphql/usuario'
import PessoaContext from '../contexts/PessoaContext'
import EnderecoContext from '../contexts/EnderecoContext'
import ContatoContext from '../contexts/ContatoContext'
import contatoReducer from '../store/contato/reducer'
import { loadData } from '../store/contato/acitons'
import UsuarioContext from '../contexts/UsuarioContext'
import PessoaForm from '../forms/PessoaForm'
import EnderecoForm from '../forms/EnderecoForm'
import ContatoForm from '../forms/ContatoForm'
import UsuarioForm from '../forms/UsuarioForm'

export default function UsuarioEdit() {
  const classes = useStyles()
  let history = useHistory()
  const { id } = useParams()

  const [usuario, setUsuario] = React.useState({})
  const [pessoa, setPessoa] = React.useState({})
  const [contatoState, contatoDispatch] = React.useReducer(contatoReducer)
  const [endereco, setEndereco] = React.useState({})

  const pessoaRef = React.useRef()
  const enderecoRef = React.useRef()
  const contatoRef = React.useRef()
  const usuarioRef = React.useRef()

  const [handleCreateUsuario] = useMutation(CREATE_WITH_INCLUDES, {
    variables: {
      ...usuario,
      pessoa: {
        ...pessoa,
        dataNascimento: toDatabaseDate(pessoa.dataNascimento),
        contato: contatoState,
        enderecos: [endereco]
      }
    }
  })

  /**
   * @method handleSubmit Envio dos dados do furmulário para criação do usuário
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    const usuarioResponse = await handleCreateUsuario()
    if (usuarioResponse.data.createUsuarioWithIncludes.ok) {
      alert('Usuário criado com sucesso!')
      handleBack()
    } else {
      alert('Não foi possível criar o paciente :(')
    }
  }

  const handleReset = () => {
    pessoaRef.current.handleReset()
    enderecoRef.current.handleReset()
    contatoRef.current.handleReset()
    usuarioRef.current.handleReset()
  }

  const handleBack = () => {
    handleReset()
    history.push('/usuarios')
  }

  /**
   * Query para exibir os dados do usuário
   * @param id id do usuário
   * @return {object} data: objeto com os dados do usuário
   */
  const usuarioData = useQuery(GET_WITH_INCLUDES, {
    variables: { id },
    onCompleted: (data) => {
      setPessoa(data.usuario.pessoa)
      //setContato(data.usuario.pessoa.contato)
      contatoDispatch(loadData(data.usuario.pessoa.contato))
      setEndereco(data.usuario.pessoa.enderecos[0])
      setUsuario(data.usuario)
    },
    skip: !id
  })

  if (usuarioData.loading) { return <p>Carregando...</p> }

  return (
    <React.Fragment>
      <CssBaseline />
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.fieldsContainer}>
          <UsuarioContext.Provider value={{usuario, setUsuario}}>
            <Paper className={classes.paper} elevation={2}>
              <Box className={classes.boxFieldset} component="fieldset">
                {/*<div className={classes.fields}>
                  <TextField
                    className={clsx(classes.formFields, classes.grow2)}
                    // error={!!errors["nomeError"]}
                    name="nome"
                    value={pessoa.nome || ''}
                    onChange={handleChangePessoa}
                    label="Nome"
                    // helperText={errors["nomeError"]}
                  /> */}
                <legend className={classes.boxTitle}>
                  <Typography>Dados Pessoais</Typography>
                </legend>
                <PessoaContext.Provider value={{pessoa, setPessoa}}>
                  <PessoaForm
                    ref={pessoaRef}
                    disabled={!!id}
                  />
                </PessoaContext.Provider>
              </Box>
            </Paper>

            <Paper className={classes.paper} elevation={2}>
              <Box className={classes.boxFieldset} component="fieldset">
                <legend className={classes.boxTitle}>
                  <Typography>Endereço</Typography>
                </legend>
                <EnderecoContext.Provider value={{endereco, setEndereco}}>
                  <EnderecoForm
                    ref={enderecoRef}
                    disabled={!!id}
                  />
                </EnderecoContext.Provider>
              </Box>
            </Paper>

            <Paper className={classes.paper} elevation={2}>
              <Box className={classes.boxFieldset} component="fieldset">
                <legend>
                  <Typography>Contato</Typography>
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
                  <Typography>Dados de Usuário</Typography>
                </legend>
                <UsuarioForm
                  ref={usuarioRef}
                  disabled={!!id}
                />
              </Box>
            </Paper>
          </UsuarioContext.Provider>
        </div>  

        <div>
          <Button
            className={classes.formButton}
            type="reset"
            // variant="contained"
            // color="secondary"
            size="small"
            onClick={handleBack}
          >{ !!id ? 'Voltar' : 'Cancelar'}</Button>
          <Button
            className={classes.formButton}
            // type="submit"
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSubmit}
            disabled={!!id}
          >Salvar</Button>
        </div>
      </form>
    </React.Fragment>
  )
}