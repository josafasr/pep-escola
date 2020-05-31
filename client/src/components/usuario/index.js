import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import clsx from 'clsx'
import {
  CssBaseline,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem
} from '@material-ui/core'

import useStyles from './styles'
import { toDatabaseDate } from '../../utils/format'
import contatoApi from '../contato/api'
import enderecoApi from '../endereco/api'
import pessoaApi from '../pessoa/api'
import usuarioApi from './api'

export default function Usuario() {

  let history = useHistory()

  const { id } = useParams()

  const classes = useStyles()

  const [usuario, setUsuario] = React.useState({ nome: '', senha: '', pessoa: '', grupos: [] })
  const [pessoa, setPessoa] = React.useState({ nome: '', nascimento: '', sexo: '', contato: '', enderecos: '' })
  const [contato, setContato] = React.useState({ celular: '', telefone: '', email: '', homePage: '' })
  const [endereco, setEndereco] = React.useState({
    tipoLogradouro: '',
    logradouro: '',
    numero: '',
    bairro: '',
    complemento: '',
    cep: '',
    cidade: ''
  })

  const handleChangePessoa = event => {
    event.preventDefault()
    event.stopPropagation()
    const { name, value } = event.target

    setPessoa(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleChangeEndereco = event => {
    event.preventDefault()
    event.stopPropagation()
    const { name, value } = event.target

    setEndereco(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleChangeContato = event => {
    event.preventDefault()
    event.stopPropagation()
    const { name, value } = event.target

    setContato(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleChangeUsuario = event => {
    event.preventDefault()
    event.stopPropagation()
    const { name, value } = event.target

    setUsuario(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  const [handleCreateContato] = useMutation(contatoApi.createMutation, {
    variables: contato
  })

  const [handleCreateEndereco] = useMutation(enderecoApi.createMutation, {
    variables: {
      tipoLogradouroId: parseInt(endereco.tipoLogradouro),
      logradouro: endereco.logradouro,
      numero: parseInt(endereco.numero),
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cep: endereco.cep,
      cidadeId: parseInt(endereco.cidade),
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
          dataNascimento: toDatabaseDate(pessoa.nascimento),
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
    setUsuario({ nome: '', senha: '', pessoa: '', grupos: [] })
    setContato({ celular: '', telefone: '', email: '', homePage: '' })
    setEndereco({
      tipoLogradouro: '',
      logradouro: '',
      numero: '',
      bairro: '',
      complemento: '',
      cep: '',
      cidade: ''
    })
    setPessoa({ nome: '', nascimento: '', sexo: '', contato: '' })
  }

  const handleBack = () => {
    history.push('/usuarios')
  }

  /**
   * Query para exibir os dados do usuário
   * @param id id do usuário
   * @return {object} data: objeto com os dados do usuário
   */
  useQuery(usuarioApi.findAllFieldsQuery, {
    variables: { id },
    onCompleted: (data) => {
      setUsuario({ nome: data.usuario.nome })
      setPessoa({ nome: data.usuario.pessoa?.nome, nascimento: data.usuario.pessoa?.dataNascimento, sexo: data.usuario.pessoa?.sexo })
      setContato({ celular: data.usuario.pessoa?.contato?.celular, telefone: data.usuario.pessoa?.contato?.telefone, email: data.usuario.pessoa?.contato?.email, homePage: data.usuario.pessoa?.contato?.homePage })
      setEndereco({
        tipoLogradouro: data.usuario.pessoa?.enderecos[0]?.tipoLogradouro?.nome,
        logradouro: data.usuario.pessoa?.enderecos[0]?.logradouro,
        numero: data.usuario.pessoa?.enderecos[0]?.numero,
        bairro: data.usuario.pessoa?.enderecos[0]?.bairro,
        complemento: data.usuario.pessoa?.enderecos[0]?.complemento,
        cep: data.usuario.pessoa?.enderecos[0]?.cep,
        cidade: data.usuario.pessoa?.enderecos[0]?.cidade?.nome
      })
    },
    skip: !id
  })

  return (
    <React.Fragment>
      <CssBaseline />
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.fieldsContainer}>
          <Paper className={classes.paper} elevation={2}>
            <Box className={classes.boxFieldset} component="fieldset">
              <div className={classes.fields}>
                <TextField
                  className={clsx(classes.formFields, classes.grow2)}
                  // error={!!errors["nomeError"]}
                  name="nome"
                  value={pessoa.nome || ''}
                  onChange={handleChangePessoa}
                  label="Nome"
                  // helperText={errors["nomeError"]}
                />

                <TextField
                  // type="date"
                  format={'DD/MM/YYYY'}
                  placeholder="data"
                  className={classes.formFields}
                  // error={!!errors["nascimentoError"]}
                  name="nascimento"
                  value={pessoa.nascimento || ''}
                  onChange={handleChangePessoa}
                  label="Data de nascimento"
                  // helperText={errors["nascimentoError"]}
                  // format="DD/MM/YYYY"
                  placeholder="dd/mm/aaaa"
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  className={clsx(classes.formFields, classes.selectField)}
                  // error={!!errors["sexoError"]}
                  name="sexo"
                  value={pessoa.sexo || ''}
                  onChange={handleChangePessoa}
                  label="Sexo"
                  // helperText={errors["sexoError"]}
                  select
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="Feminino">Feminino</MenuItem>
                  <MenuItem value="Masculino">Masculino</MenuItem>
                </TextField>
              </div>
            </Box>
          </Paper>

          <Paper className={classes.paper} elevation={2}>
            <Box className={classes.boxFieldset} component="fieldset">
              <legend className={classes.boxTitle}>
                <Typography>Endereço</Typography>
              </legend>
              <div className={classes.fields}>
                <TextField
                  // className="text-field select-field"
                  className={clsx(classes.formFields, classes.selectField)}
                  name="tipoLogradouro"
                  value={endereco.tipoLogradouro || ''}
                  onChange={handleChangeEndereco}
                  label="Tipo de Logradouro"
                  select
                >
                  <MenuItem value={0}></MenuItem>
                  <MenuItem value={1}>Alameda</MenuItem>
                  <MenuItem value={2}>Avenida</MenuItem>
                  <MenuItem value={3}>Praça</MenuItem>
                  <MenuItem value={4}>Rua</MenuItem>
                  <MenuItem value={5}>Travessa</MenuItem>
                </TextField>

                <TextField
                  className={clsx(classes.formFields, classes.grow2)}
                  name="logradouro"
                  value={endereco.logradouro || ''}
                  onChange={handleChangeEndereco}
                  label="Logradouro"
                />

                <TextField
                  className={classes.formFields}
                  type="number"
                  name="numero"
                  value={endereco.numero || ''}
                  onChange={handleChangeEndereco}
                  label="Número"
                />

                <TextField
                  className={classes.formFields}
                  name="bairro"
                  value={endereco.bairro || ''}
                  onChange={handleChangeEndereco}
                  label="Bairro"
                />

                <TextField
                  className={classes.formFields}
                  name="complemento"
                  value={endereco.complemento || ''}
                  onChange={handleChangeEndereco}
                  label="Complemento"
                />

                <TextField
                  className={classes.formFields}
                  name="cep"
                  value={endereco.cep || ''}
                  onChange={handleChangeEndereco}
                  label="CEP"
                />

                <TextField
                  className={clsx(classes.formFields, classes.selectField)}
                  name="cidade"
                  value={endereco.cidade || ''}
                  onChange={handleChangeEndereco}
                  label="Cidade"
                  select
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value={1}>Itapetinga</MenuItem>
                  <MenuItem value={2}>Jequié</MenuItem>
                  <MenuItem value={3}>Vitória da Conquista</MenuItem>
                </TextField>
              </div>
            </Box>
          </Paper>

          <Paper className={classes.paper} elevation={2}>
            <Box className={classes.boxFieldset} component="fieldset">
              <legend>
                <Typography>Contato</Typography>
              </legend>
              <div className={classes.fields}>
                <TextField
                  className={classes.formFields}
                  name="celular"
                  value={contato.celular || ''}
                  onChange={handleChangeContato}
                  label="Celular"
                  // ref={field}
                />

                <TextField
                  className={classes.formFields}
                  name="telefone"
                  value={contato.telefone || ''}
                  onChange={handleChangeContato}
                  label="Telefone"
                />

                <TextField
                  className={classes.formFields}
                  type="email"
                  name="email"
                  value={contato.email || ''}
                  onChange={handleChangeContato}
                  label="E-mail"
                />

                <TextField
                  className={classes.formFields}
                  name="homePage"
                  value={contato.homePage || ''}
                  onChange={handleChangeContato}
                  label="Home Page"
                />
              </div>
            </Box>
          </Paper>

          <Paper className={classes.paper} elevation={2}>
            <Box className={classes.boxFieldset} component="fieldset">
              <legend>
                <Typography>Dados de Usuário</Typography>
              </legend>
              <div className={classes.fields}>
                <TextField
                  className={classes.formFields}
                  // error={!!errors["nomeUsuarioError"]}
                  name="nome"
                  value={usuario.nome || ''}
                  onChange={handleChangeUsuario}
                  label="Nome de usuário"
                  // helperText={errors["nomeUsuarioError"]}
                />

                <TextField
                  className={classes.formFields}
                  // error={!!errors["senhaError"]}
                  type="password"
                  name="senha"
                  value={usuario.senha || ''}
                  onChange={handleChangeUsuario}
                  label="Senha"
                  // helperText={errors["senhaError"]}
                />

                {/* <TextField
                  className={classes.formFields}
                  // error={!!errors["pessoaIdError"]}
                  name="pessoa"
                  value={usuario.pessoa}
                  onChange={handleChangeUsuario}
                  label="Pessoa"
                  // helperText={errors["pessoaIdError"]}
                /> */}

                {/* <TextField
                  className="text-field"
                  name="grupos"
                  value={usuario.grupos}
                  onChange={this.handleChangeUsuario}
                  label="Grupos"
                /> */}
              </div>
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