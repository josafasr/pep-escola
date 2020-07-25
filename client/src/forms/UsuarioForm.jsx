/**
 * @title Formulário para criação/edição dos dados de usuário
 * @module src/forms/UsuarioForm
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

function UsuarioForm(props, ref) {
  const classes = useStyles()
  const { usuarioData, disabled } = props
  const [fields, setFields] = React.useState({
    nome: usuarioData?.nome || '',
    senha: '',
    grupos: []
  })

  const handleChange = event => {
    event.preventDefault()
    const { name, value } = event.target
    setFields({
      ...fields,
      [name]: value
    })
  }

  const handleReset = () => {
    setFields({ nome: '', senha: '', grupos: [] })
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
        name="nome"
        value={fields.nome}
        onChange={handleChange}
        label="Nome de usuário"
        size="small"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        type="password"
        className={classes.formFields}
        name="senha"
        value={fields.senha}
        onChange={handleChange}
        label="Senha"
        size="small"
        inputProps={{
          readOnly: disabled
        }}
      />
    </div>
  )
}
export default React.forwardRef(UsuarioForm)