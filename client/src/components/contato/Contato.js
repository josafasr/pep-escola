import React from "react"
import { useMutation } from "@apollo/react-hooks"
import {
  makeStyles,
  CssBaseline,
  // Container,
  Paper,
  Box,
  Typography,
  TextField
  Button
} from '@material-ui/core'

import contatoApi from './api'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },

  paper: {
    width: '100%'
  },

  form: {
    width: '100%',
    padding: theme.spacing(2)
  },

  boxFieldset: {
    borderStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    }
  },

  boxTitle: {
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  fieldsContainer: {
    width: '100%'
  },

  formFields: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 0, 0)
    }
  },

  formButton: {
    width: '100%',
    textTransform: 'none',
    color: 'white',
    // backgroundColor: '#f50057',
    margin: theme.spacing(1, 0, 1, 0),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 0, 0),
      width: 'auto'
    }
  }
}))

export default function Contato() {

  const classes = useStyles()

  const CREATE_CONTATO = contatoApi.createMutation

  const [fields, setFields] = React.useState({ celular: '', telefone: '', email: '', homePage: '' })

  const handleChange = event => {
    event.preventDefault()
    event.stopPropagation()
    const { name, value } = event.target

    setFields(prevValues => ({
      ...prevValues,
      [name]: value
    }))
    // console.log(fields)
  }

  const [handleCreateContato] = useMutation(CREATE_CONTATO, {
    variables: fields
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await handleCreateContato()
    const { ok, contato } = response.data.createContato

    if (ok) {
      setFields({ celular: '', telefone: '', email: '', homePage: '' })
      // console.log(contato)
    }
  }

  return (

    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper} elevation={2}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.fieldsContainer}>
            <Box className={classes.boxFieldset} component="fieldset">
              <legend>
                <Typography variant="h6">Contato</Typography>
              </legend>

              <TextField
                className={classes.formFields}
                name="celular"
                value={fields.celular}
                onChange={handleChange}
                label="Celular"
                // ref={field}
              />

              <TextField
                className={classes.formFields}
                name="telefone"
                value={fields.telefone}
                onChange={handleChange}
                label="Telefone"
              />

              <TextField
                className={classes.formFields}
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                label="E-mail"
              />

              <TextField
                className={classes.formFields}
                name="homePage"
                value={fields.homePage}
                onChange={handleChange}
                label="Home Page"
              />
            </Box>
          </div>
          <div>
            <Button
              className={classes.formButton}
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >Criar</Button>
          
            <Button
              className={classes.formButton}
              type="reset"
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => setFields({ celular: '', telefone: '', email: '', homePage: '' })}
            >Cancelar</Button>
          </div>
        </form>
      </Paper>
    </div>
  )
}
