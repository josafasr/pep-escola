/**
 * @description Página de edição de dados de usuários
 * @module src/pages/UsuarioEdit
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
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

export default function UsuarioEdit() {
  const classes = useStyles()
  let history = useHistory()
  const { userId } = useParams()
  const editar = useRouteMatch('/usuarios/:userId/editar') // history.location.pathname.split('/').includes('editar')

  const [usuario, setUsuario] = React.useState({})
  const [pessoa, setPessoa] = React.useState({})
  const [contatoState, contatoDispatch] = React.useReducer(contatoReducer)
  //const [endereco, setEndereco] = React.useState({})
  console.log('UsuarioEdit:', usuario);

  const pessoaRef = React.useRef()
  //const enderecoRef = React.useRef()
  const contatoRef = React.useRef()
  const usuarioRef = React.useRef()

  /**
   * Query para exibir os dados do usuário
   * @param userId userId do usuário
   * @return {object} data: objeto com os dados do usuário
   */
  const usuarioData = useQuery(GET_WITH_INCLUDES, {
    variables: { id: userId },
    onCompleted: (data) => {
      setUsuario(data.usuario)
      setPessoa(data.usuario.pessoa)
      //setContato(data.usuario.pessoa.contato)
      contatoDispatch(loadData(data.usuario.pessoa.contato))
      //setEndereco(data.usuario.pessoa.enderecos[0])
    },
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
      alert('Não foi possível criar o usuário :(')
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

  if (usuarioData.loading) { return <p>Carregando...</p> }

  if (changePassword) {
    return (
      <Paper className={classes.paper} elevation={2}>
        <Box className={classes.boxFieldset} component="fieldset">
          <legend>
            <Typography>Dados de Usuário</Typography>
          </legend>
          <ChangePasswordForm
            ref={usuarioRef}
            //disabled={false}
          />
        </Box>
      </Paper>

      /* <div>
        <Button
          className={classes.formButton}
          type="reset"
          // variant="contained"
          // color="secondary"
          size="small"
          onClick={handleBack}
        >Cancelar</Button>
        <Button
          className={classes.formButton}
          // type="submit"
          variant="contained"
          color="primary"
          size="small"
          //onClick={handleChangePassword}
          //disabled={!!userId}
        >Salvar</Button>
      </div> */
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
          >{!!userId && !editar ? 'Voltar' : 'Cancelar'}</Button>
          <Button
            className={classes.formButton}
            variant="contained"
            color="primary"
            size="small"
            onClick={!userId ? handleSubmit : goToEdit}
          >{!!userId && !editar ? 'Editar' : 'Salvar'}</Button>
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