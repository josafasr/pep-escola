/**
 * @description Formulário para criação/edição dos dados de usuário
 * @module src/forms/UsuarioForm
 * @author Josafá Santos dos Reis
 */

import React, { useContext, useImperativeHandle, forwardRef } from 'react'
import {
  makeStyles,
  TextField
} from '@material-ui/core'

import UsuarioContext from '../contexts/UsuarioContext'

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
  const { disabled } = props

  const { usuario, setUsuario } = useContext(UsuarioContext)

  const handleChange = event => {
    const { name, value } = event.target
    setUsuario({
      ...usuario,
      [name]: value
    })
  }

  const handleReset = () => {
    setUsuario({ nome: '', senha: '', grupos: [] })
  }

  /**
   * Possibilita, ao component pai,
   * acesso a métodos deste component
   */
  useImperativeHandle(ref, () => ({
    handleReset: () => {
      handleReset()
    }
  }))

  /**
   * Emite aviso de mudança ao component pai
   */
  /* React.useEffect(() => {
    if (props.onChange) {
      props.onChange(fields)
    }
  }, [props, fields]) */

  return (
    <div className={classes.fields}>
      <TextField
        className={classes.formFields}
        name="nome"
        value={usuario.nome || ''}
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
        value={usuario.senha || ''}
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
export default forwardRef(UsuarioForm)