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

const useStyles = makeStyles((theme) => ({
  fields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
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
      margin: theme.spacing(2, 2, 0, 0)
    }
  }
}))

function ContatoForm(props, ref) {

  const { contatoData, disabled } = props

  const classes = useStyles()

  const [fields, setFields] = React.useState({
    celular: contatoData?.celular || '',
    telefone: contatoData?.telefone || '',
    email: contatoData?.email || ''
  })

  const handleChange = event => {
    event.preventDefault()
    event.stopPropagation()
    const { name, value } = event.target

    setFields({ ...fields, [name]: value })
  }

  const handleReset = () => {
    setFields({ celular: '', telefone: '', email: '' })
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

  /**
   * Emite aviso de mudança ao component pai
   */
  React.useEffect(() => {
    if (props.onChange) {
      props.onChange(fields)
    }
  }, [props, fields])

  return (
    <div className={classes.fields}>
      <TextField
        className={classes.formFields}
        name="celular"
        value={fields.celular}
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
        value={fields.telefone}
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
        value={fields.email}
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