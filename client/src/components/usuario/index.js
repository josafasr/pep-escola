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

import useStyles from './styles'
import { toDatabaseDate } from '../../utils/format'
import contatoApi from '../contato/api'
import enderecoApi from '../endereco/api'
import pessoaApi from '../pessoa/api'
import usuarioApi from './api'
import PessoaForm from '../../forms/PessoaForm'
import EnderecoForm from '../../forms/EnderecoForm'
import ContatoForm from '../../forms/ContatoForm'
import UsuarioForm from '../../forms/UsuarioForm'

export default function Usuario() {
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

  const [handleCreateContato] = useMutation(contatoApi.createMutation, {
    variables: contato
  })

  const [handleCreateEndereco] = useMutation(enderecoApi.createMutation, {
    variables: {
      tipoLogradouroId: parseInt(endereco.tipoLogradouroId),
      logradouro: endereco.logradouro,
      numero: parseInt(endereco.numero),
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cep: endereco.cep,
      cidadeId: parseInt(endereco.cidadeId),
      ativo: true
    }
  })

  const [handleCreatePessoa] = useMutation(pessoaApi.createMutation)

  const [handleCreateUsuario] = useMutation(usuarioApi.createMutation)

  /**
   * @method handleSubmit Envio dos dados do furmulário para criação do usuário
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    const contatoResponse = await handleCreateContato()

    const enderecoResponse = await handleCreateEndereco()

    // if (contatoResponse.data.createContato.ok && enderecoResponse.data.createEndereco.ok) {
    if (contatoResponse.data.createContato.ok) {
      console.log('Created contato: ', contatoResponse.data.createContato.contato)
      const createdContato = contatoResponse.data.createContato.contato
      const createdEndereco = enderecoResponse.data.createEndereco.endereco

      const pessoaResponse = await handleCreatePessoa({
        variables: {
          nome: pessoa.nome,
          dataNascimento: toDatabaseDate(pessoa.dataNascimento),
          sexo: pessoa.sexo,
          contatoId: parseInt(createdContato.id),
          enderecos: [parseInt(createdEndereco.id)],
        }
      })

      if (pessoaResponse.data.createPessoa.ok) {
        console.log('Created pessoa: ', pessoaResponse.data.createPessoa.pessoa)
        const createdPessoa = pessoaResponse.data.createPessoa.pessoa

        const usuarioResponse = await handleCreateUsuario({
          variables: {
            pessoaId: parseInt(createdPessoa.id),
            ...usuario
          }
        })

        if(usuarioResponse.data.createUsuario.ok) {
          console.log('Created usuario: ', usuarioResponse.data.createUsuario.usuario)
          handleReset()
        } else {
          console.log('Errors usuario: ', usuarioResponse.data.createUsuario.errors)
        }
      } else {
        console.log('Errors pessoa: ', pessoaResponse.data.createPessoa.errors)
      }
    } else {
      if (!contatoResponse.data.createContato.ok) {
        console.log('Errors contato: ', contatoResponse.data.createContato.errors)
      }
      if (!enderecoResponse.data.createEndereco.ok) {
        console.log('Errors endereço: ', enderecoResponse.data.createEndereco.errors)
      }
    }
  }

  const handleReset = () => {
    pessoaRef.current.handleReset()
    enderecoRef.current.handleReset()
    contatoRef.current.handleReset()
    usuarioRef.current.handleReset()
  }

  const handleBack = () => {
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
  const usuarioData = useQuery(usuarioApi.findAllFieldsQuery, {
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
            // type="submit"
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSubmit}
            disabled={!!id}
          >Salvar</Button>
        
          <Button
            className={classes.formButton}
            type="reset"
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleBack}
          >{ !!id ? 'Voltar' : 'Cancelar'}</Button>
        </div>
      </form>
    </React.Fragment>
  )
}