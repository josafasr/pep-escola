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
  const [contato, setContato] = React.useState({})
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
        contato: contato,
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

  const handleChangePessoa = data => {
    setPessoa(data)
  }

  const handleChangeEndereco = data => {
    setEndereco(data)
  }

  const handleChangeContato = data => {
    setContato(data)
  }

  const handleChangeUsuario = data => {
    setUsuario(data)
  }

  /**
   * Query para exibir os dados do usuário
   * @param id id do usuário
   * @return {object} data: objeto com os dados do usuário
   */
  const usuarioData = useQuery(GET_WITH_INCLUDES, {
    variables: { id },
    skip: !id
  })

  if (usuarioData.loading) { return <p>Carregando...</p> }

  return (
    <React.Fragment>
      <CssBaseline />
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.fieldsContainer}>
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
              <PessoaForm
                pessoaData={usuarioData.data?.usuario?.pessoa}
                onChange={handleChangePessoa}
                ref={pessoaRef}
                disabled={!!id}
              />
            </Box>
          </Paper>

          <Paper className={classes.paper} elevation={2}>
            <Box className={classes.boxFieldset} component="fieldset">
              <legend className={classes.boxTitle}>
                <Typography>Endereço</Typography>
              </legend>
              <EnderecoForm
                enderecoData={usuarioData.data?.usuario?.pessoa?.enderecos[0]}
                onChange={handleChangeEndereco}
                ref={enderecoRef}
                disabled={!!id}
              />
            </Box>
          </Paper>

          <Paper className={classes.paper} elevation={2}>
            <Box className={classes.boxFieldset} component="fieldset">
              <legend>
                <Typography>Contato</Typography>
              </legend>
              <ContatoForm
                contatoData={usuarioData.data?.usuario?.pessoa?.contato}
                onChange={handleChangeContato}
                ref={contatoRef}
                disabled={!!id}
              />
            </Box>
          </Paper>

          <Paper className={classes.paper} elevation={2}>
            <Box className={classes.boxFieldset} component="fieldset">
              <legend>
                <Typography>Dados de Usuário</Typography>
              </legend>
              <UsuarioForm
                usuarioData={usuarioData.data?.usuario}
                onChange={handleChangeUsuario}
                ref={usuarioRef}
                disabled={!!id}
              />
            </Box>
          </Paper>
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