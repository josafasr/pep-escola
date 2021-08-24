/**
 * @description Formulário para login no sistema
 * @module src/form/LoginForm
 * @author Josafá Santos dos Reis
 */
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Avatar,
  TextField,
  Typography,
  CircularProgress
} from '@material-ui/core'

import { useStyles } from '../styles/login'
import { TRY_LOGIN, LOGOUT } from '../graphql/usuario'
import { getAccessToken, setAccessToken } from '../access-token'

const LoginForm = () => {
  const classes = useStyles()
  const [fields, setFields] = useState({ nome: '', senha: '' })
  const history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } }

  const [handleLogin, { loading, data }] = useLazyQuery(TRY_LOGIN, {
    onCompleted: () => {
      const { ok, token } = data.login
      if (ok) {
        setAccessToken(token)
        history.replace(from)
      }
    }
  })

  const [handleLogout] = useMutation(LOGOUT)

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

  /* const testData = event => {
    console.log(event.currentTarget.dataset.test)
  } */

  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      handleLogout()
        .then(res => {
          if (res.data.logout === true)
            setAccessToken(null)
        })
        .catch(console.log)
    }
  }, [handleLogout])

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
          {data && data.login && data.login.errors && <div className={classes.error}>{data.login.errors[0].message}</div>}
          
          <form className={classes.formCardActions} onSubmit={handleSubmit}>
            <TextField
              className={classes.textField}
              name="nome"
              label="Usuário"
              variant="outlined"
              size="small"
              placeholder="usuario"
              value={fields.nome}
              onChange={handleChange}
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
            />
            <Button
              type="submit"
              className={classes.btnLogin}
              variant="contained"
              color="secondary"
              size="small"
              disabled={fields.nome === '' || fields.senha === ''}
              //data-test="Test Data!"
              //onClick={testData}
            >
              {loading ? <CircularProgress color="inherit" size={30} /> : 'Entrar'}
            </Button>
          </form>
          {/* <CardActions className={classes.formCardActions}>
            <Link className={classes.forgetLink} to="#">Esqueceu a senha?</Link>
          </CardActions> */}
        </CardContent>
      </Card>
      <div className={classes.copy}>© 2020 - Universidade Estadual do Sudoeste da Bahia</div>
    </div>
  )
}
export default LoginForm