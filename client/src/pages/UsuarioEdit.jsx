/**
 * @description Página de edição de dados de usuários
 * @module src/pages/UsuarioEdit
 * @author Josafá Santos dos Reis
 */

import React, { useEffect } from 'react'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  CssBaseline,
  Paper,
  Box,
  Typography,
  Button,
  LinearProgress
} from '@material-ui/core'
//import decode from 'jwt-decode'

import { useStyles } from '../styles/usuario'
import { toDatabaseDate } from '../utils/format'

import { GET_WITH_INCLUDES, CREATE_WITH_INCLUDES, UPDATE_USUARIO } from '../graphql/usuario'
import PessoaContext from '../contexts/PessoaContext'
//import EnderecoContext from '../contexts/EnderecoContext'
import ContatoContext from '../contexts/ContatoContext'
import contatoReducer from '../store/contato/reducer'
import { loadData } from '../store/contato/acitons'
import UsuarioContext from '../contexts/UsuarioContext'
import PessoaForm from '../forms/PessoaForm'
//import EnderecoForm from '../forms/EnderecoForm'
import ContatoForm from '../forms/ContatoForm'
import UsuarioForm from '../forms/UsuarioForm'
import ChangePasswordForm from '../forms/ChangePasswordForm'
//import { AppContext } from '../contexts/app-context'

const UsuarioEdit = () => {
  const classes = useStyles()
  let history = useHistory()
  const { userId } = useParams()
  const { path } = useRouteMatch()
  const editar = path === '/usuarios/:userId/editar'
  const [usuario, setUsuario] = React.useState({})
  const [pessoa, setPessoa] = React.useState({})
  const [contatoState, contatoDispatch] = React.useReducer(contatoReducer)
  //const { getAccessToken } = useContext(AppContext)
  //const { userId: decodedId } = decode(getAccessToken(), { algorithms: ['RS512'] })
  //const canEdit = userId === decodedId
  //const [endereco, setEndereco] = React.useState({})

  const pessoaRef = React.useRef()
  //const enderecoRef = React.useRef()
  const contatoRef = React.useRef()
  const usuarioRef = React.useRef()

  /**
   * Query para exibir os dados do usuário
   * @param userId userId do usuário
   * @return {object} data: objeto com os dados do usuário
   */
  const { loading, refetch } = useQuery(GET_WITH_INCLUDES, {
    variables: { id: userId },
    onCompleted: (data) => {
      setUsuario(data.usuario)
      setPessoa({
        ...data.usuario.pessoa,
        dataNascimento: data.usuario.pessoa.dataNascimento !== null ?
          new Date(`${data.usuario.pessoa.dataNascimento}T03:00:00Z`).toLocaleString("pt-BR", { dateStyle: "short" }) :
          null
      })
      //setContato(data.usuario.pessoa.contato)
      contatoDispatch(loadData(data.usuario.pessoa.contato))
      //setEndereco(data.usuario.pessoa.enderecos[0])
    },
    notifyOnNetworkStatusChange: true,
    skip: !userId
  })

  const changePassword = useRouteMatch('/usuarios/:userId/alterar-senha')

  const [handleCreateUsuario] = useMutation(CREATE_WITH_INCLUDES, {
    variables: {
      ...usuario,
      pessoa: {
        ...pessoa,
        dataNascimento: toDatabaseDate(pessoa?.dataNascimento),
        contato: contatoState/* ,
        enderecos: [{
          tipoLogradouroId: parseInt(endereco?.tipoLogradouro?.userId),
          logradouro: endereco?.logradouro,
          numero: parseInt(endereco?.numero),
          bairro: endereco?.bairro,
          endereco: endereco?.complemento,
          cep: endereco?.cep,
          cidadeId: parseInt(endereco?.cidade?.userId)
        }] */
      }
    }
  })

  const [handleUpdateUsuario] = useMutation(UPDATE_USUARIO)

  /**
   * @method handleSubmit Envio dos dados do furmulário para criação do usuário
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    //event.stopPropagation()

    if (editar) {
      delete usuario['__typename']
      delete pessoa['__typename']
      delete contatoState['__typename']
      const updateResponse = await handleUpdateUsuario({
        variables: {
          ...usuario,
          pessoa: {
            ...pessoa,
            dataNascimento: toDatabaseDate(pessoa?.dataNascimento),
            contato: contatoState
          }
        }
      })
      if (updateResponse.data.updateUsuario.ok) {
        alert('Usuário atualizado com sucesso!')
        handleBack()
      } else {
        alert('Não foi possível atualizar o usuário :(')
      }
    }
    
    if (!userId) {
      const usuarioResponse = await handleCreateUsuario()
      if (usuarioResponse.data.createUsuarioWithIncludes.ok) {
        alert('Usuário criado com sucesso!')
        handleBack()
      } else {
        alert('Não foi possível criar o usuário :(')
      }
    }
  }

  const handleReset = () => {
    pessoaRef.current.handleReset()
    //enderecoRef.current.handleReset()
    contatoRef.current.handleReset()
    usuarioRef.current.handleReset()
  }

  const handleBack = () => {
    //handleReset()
    history.goBack()
  }

  const goToEdit = () => {
    history.push(`/usuarios/${userId}/editar`)
  }

  const goChangePassword = () => {
    history.push(`/usuarios/${userId}/alterar-senha`)
  }

  useEffect(() => {
    if (userId)
      refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, refetch])

  if (loading) { return <LinearProgress color="secondary" /> }

  if (changePassword) {
    return (
      <Paper className={classes.paper} elevation={2}>
        <Box className={classes.boxFieldset} component="fieldset">
          <legend>
            <Typography>Dados de Usuário</Typography>
          </legend>
          <ChangePasswordForm
            ref={usuarioRef}
          />
        </Box>
      </Paper>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <form className={classes.form}>
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
                    disabled={!!userId && !editar}
                  />
                </PessoaContext.Provider>
              </Box>
            </Paper>

            {/* <Paper className={classes.paper} elevation={2}>
              <Box className={classes.boxFieldset} component="fieldset">
                <legend className={classes.boxTitle}>
                  <Typography>Endereço</Typography>
                </legend>
                <EnderecoContext.Provider value={{endereco, setEndereco}}>
                  <EnderecoForm
                    ref={enderecoRef}
                    disabled={!!userId}
                  />
                </EnderecoContext.Provider>
              </Box>
            </Paper> */}

            <Paper className={classes.paper} elevation={2}>
              <Box className={classes.boxFieldset} component="fieldset">
                <legend>
                  <Typography>Contato</Typography>
                </legend>
                <ContatoContext.Provider value={{contatoState, contatoDispatch}}>
                  <ContatoForm
                    ref={contatoRef}
                    disabled={!!userId && !editar}
                  />
                </ContatoContext.Provider>
              </Box>
            </Paper>

            {!userId && <Paper className={classes.paper} elevation={2}>
              <Box className={classes.boxFieldset} component="fieldset">
                <legend>
                  <Typography>Dados de Usuário</Typography>
                </legend>
                <UsuarioForm
                  ref={usuarioRef}
                  disabled={!!userId}
                />
              </Box>
            </Paper>}
          </UsuarioContext.Provider>
        </div>  

        <div>
          <Button
            className={classes.formButton}
            type="reset"
            variant="contained"
            size="small"
            onClick={handleBack}
          >
            {!!userId && !editar ? 'Voltar' : 'Cancelar'}
          </Button>

          <Button
            className={classes.formButton}
            variant="contained"
            color="primary"
            size="small"
            onClick={!userId || editar ? handleSubmit : goToEdit}
          >
            {!!userId && !editar ? 'Editar' : 'Salvar'}
          </Button>

          {!!userId && !editar && <Button
            className={classes.formButton}
            variant="contained"
            color="secondary"
            size="small"
            onClick={goChangePassword}
          >Alterar Senha</Button>}
        </div>
      </form>
    </React.Fragment>
  )
}
export default UsuarioEdit