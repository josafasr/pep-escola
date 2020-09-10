/**
 * @title Formulário para criação/edição dos dados de contatos
 * @module src/forms/ContatoForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import {
  makeStyles,
  TextField
} from '@material-ui/core'

import ContatoContext from '../contexts/ContatoContext'

const useStyles = makeStyles((theme) => ({
  fields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    }
  },

  formFields: {
    margin: theme.spacing(1, 0),
    minWidth: '210px',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1, 2, 0, 0)
    }
  }
}))

function ContatoForm(props, ref) {

  const { disabled } = props

  const classes = useStyles()

  const {contato, setContato} = React.useContext(ContatoContext)

  const handleChange = event => {
    const { name, value } = event.target
    setContato(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleReset = () => {
    setContato({ celular: '', telefone: '', email: '' })
  }

  /**
   * Possibilita, ao component pai, 
   * acesso a métodos deste component
   */
  React.useImperativeHandle(ref, () => ({
    handleReset: () => {
      handleReset()
    }
  }))

  return (
    <div className={classes.fields}>
      <TextField
        className={classes.formFields}
        name="celular"
        value={contato.celular || ''}
        onChange={handleChange}
        label="Celular"
        size="small"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="telefone"
        value={contato.telefone || ''}
        onChange={handleChange}
        label="Telefone"
        size="small"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        type="email"
        name="email"
        value={contato.email || ''}
        onChange={handleChange}
        label="E-mail"
        size="small"
        inputProps={{
          readOnly: disabled
        }}
      />
    </div>
  )
}
export default React.forwardRef(ContatoForm)