/**
 * Componente para o cadastro de usuários
 * @author Josafá Santos
 */

import React from 'react'
// import { withRouter } from "react-router-dom";
import { graphql } from 'react-apollo'
import { Paper, TextField, Button } from '@material-ui/core'

import api from './api'
import './User.css'

class User extends React.Component {
  state = {
    nome: '',
    nomeError: '',
    email: '',
    emailError: '',
    senha: '',
    senhaError: ''
  }

  onChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  onSubmit = async (event) => {
    this.setState({
      nomeError: '',
      emailError: '',
      senhaError: ''
    });

    event.preventDefault()

    const { nome, email, senha } = this.state
    const response = await this.props.mutate({
      variables: { nome, email, senha }
    })

    const { ok, errors } = response.data.createUsuario;

    if (ok) {
      // this.props.history.push('/')
      this.setState({
        nome: '',
        email: '',
        senha: ''
      })
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }

  }

  render() {
    const { nome, email, senha, nomeError, emailError, senhaError } = this.state

    return (
      <Paper className="paper" elevation={5}>
        <form className="form" onSubmit={this.onSubmit}>
          <TextField
            className="text-field"
            error={!!nomeError}
            name="nome"
            value={nome}
            onChange={this.onChange}
            label="Nome"
            helperText={nomeError}
          />

          <TextField
            className="text-field"
            error={!!emailError}
            type="text"
            name="email"
            value={email}
            onChange={this.onChange}
            label="E-mail"
            helperText={emailError}
          />

          <TextField
            className="text-field"
            error={!!senhaError}
            type="password"
            name="senha"
            value={senha}
            onChange={this.onChange}
            label="Senha"
            helperText={senhaError}
          />

          <Button className="button" type="submit" variant="contained">Criar</Button>
        </form>
      </Paper>
    )
  }
}

const createUserMutation = api.createMutation

export default graphql(createUserMutation)(Users)
