/**
 * Página para login no sistema
 * @author Josafá Santos
 */

import React from 'react'
import { withRouter } from "react-router-dom";
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import {
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Button,
    Avatar,
    TextField,
    Typography
} from '@material-ui/core'

import './Login.css'

// export default function Login(props) {
class Login extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    localStorage.removeItem('token')
    localStorage.removeItem('reloadToken')
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (event) => {
    // event.preventDefault()
    this.setState({ errors: {} })

    const response = await this.props.mutate({
      variables: {
        nome: this.state.username,
        senha: this.state.password,
      }
    })
    console.log(response)

    const { ok, token, reloadToken, errors } = response.data.login

    if (ok) {
      localStorage.setItem('token', token)
      localStorage.setItem('reloadToken', reloadToken)
      this.props.history.push('/home')
    } else {
      const err = {}
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message
      });

      this.setState({ errors: err })

    }
  }

  render() {

    const { errors } = this.state

    return (
      <Card className="card">
        <CardHeader
          className="header"
          title={
            <Typography className="typo-title" variant="h6">
              Prontuário Eletrônico
            </Typography>
          }
          subheader="Centro Universitário de Atenção à Saúde"
          avatar={
            <Avatar src="uesb.png" variant="square" aria-label="recipe" className="media" />
          }
        />

        <CardContent className="card-content">
          <form className="form">
            <TextField
              className="text-field"
              name="username"
              label="Usuário"
              id="user-text-field"
              variant="outlined"
              size="small"
              placeholder="usuario"
              value={this.state.username}
              onChange={this.handleChange}
              error={!!errors.nameError}
              helperText={errors.nameError} />

            <TextField
              type="password"
              className="text-field"
              name="password"
              label="Senha"
              id="password-text-field"
              variant="outlined"
              size="small"
              placeholder="123456"
              value={this.state.password}
              onChange={this.handleChange}
              error={!!errors.passwordError}
              helperText={errors.passwordError} />
          </form>
        </CardContent>
        <CardActions className="card-actions">
          <Button className="btn-login" variant="contained" color="secondary" size="small" onClick={this.handleSubmit}>Entrar</Button>
        </CardActions>
        {/* <Link to="#">Esqueceu a senha?</Link> */}
      </Card>
    )
  }
}

const loginMutation = gql`
  mutation($nome: String, $senha: String) {
    login(nome: $nome, senha: $senha) {
      ok
      token
      reloadToken
      errors {
        path
        message
      }
    }
  }`

export default graphql(loginMutation)(withRouter(Login))