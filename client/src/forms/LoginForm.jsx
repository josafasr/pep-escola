/**
 * @title Formulário para login no sistema
 * @module src/form/LoginForm
 * @author Josafá Santos dos Reis
 */
import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Avatar,
  TextField,
  Typography,
  CircularProgress
} from '@material-ui/core'

import { useStyles } from '../styles/login'
import { TRY_LOGIN } from '../graphql/usuario'

const LoginForm = () => {
  const classes = useStyles()
  const [fields, setFields] = React.useState({
    nome: '',
    senha: ''
  })
  const history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } }

  const [handleLogin, { loading, data }] = useLazyQuery(TRY_LOGIN, {
    onCompleted: () => {
      const { token, reloadToken } = data.login
      localStorage.setItem('token', token)
      localStorage.setItem('reloadToken', reloadToken)
      history.replace(from)
    }
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFields(prevValues => ({ ...prevValues, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    handleLogin({
      variables: fields
    })
  }

  React.useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('reloadToken')
  }, [])

  return (
    <div className={classes.root}>
      <Card
        className={classes.card}
        classes={{
          root: classes.overflowRoot
        }}
      >
        <CardHeader
          className={classes.header}
          title={
            <Typography className={classes.typoTitle} variant="h6">
              Prontuário Eletrônico
            </Typography>
          }
          subheader="Centro Universitário de Atenção à Saúde"
          avatar={
            <Avatar
              src="/images/logo-uesb.png"
              alt="Logo Uesb"
              variant="square"
              aria-label="recipe"
              className={classes.media}
            />
          }
        />
        <CardContent className={classes.cardContent}>
          <form className={classes.formCardActions}>
            <TextField
              className={classes.textField}
              name="nome"
              label="Usuário"
              variant="outlined"
              size="small"
              placeholder="usuario"
              value={fields.nome}
              onChange={handleChange}
              //error={!!errors.nameError}
              //helperText={errors.nameError}
            />

            <TextField
              type="password"
              className={classes.textField}
              name="senha"
              label="Senha"
              variant="outlined"
              size="small"
              placeholder="usuario"
              value={fields.senha}
              onChange={handleChange}
              //error={!!errors.passwordError}
              //helperText={errors.passwordError}
            />
          </form>
        </CardContent>
        <CardActions className={classes.formCardActions}>
          <Button
            className={classes.btnLogin}
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleSubmit}
            disabled={fields.nome === '' || fields.senha === ''}
          >
            {loading ? <CircularProgress color="inherit" size={30} /> : 'Entrar'}
          </Button>

          <Link className={classes.forgetLink} to="#">Esqueceu a senha?</Link>
        </CardActions>
      </Card>
      <div className={classes.copy}>© 2020 - Universidade Estadual do Sudoeste da Bahia</div>
    </div>
  )
}
export default LoginForm