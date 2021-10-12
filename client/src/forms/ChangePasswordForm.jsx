/**
 * @description Formulário para alteração da senha de usuário
 * @module src/forms/ChangePasswordForm
 * @author Josafá Santos dos Reis
 */

import React, { useImperativeHandle, useState, forwardRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import {
  makeStyles,
  TextField,
  Button
} from '@material-ui/core'

import { CHANEG_PASSWORD } from '../graphql/usuario'

const useStyles = makeStyles((theme) => ({
  fields: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      width: '40%'
    }
  },

  formFields: {
    margin: theme.spacing(1, 0),
    minWidth: '210px',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 0, 0)
    }
  },

  confirmationError: {
    paddingTop: '5px',
    color: 'red'
  },

  formButtons: {
    marginTop: '10px'
  },

  formButton: {
    width: '100%',
    textTransform: 'none',
    marginBottom: '10px',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      marginRight: '10px'
    }
  },

  errorMessage: {
    color: 'red'
  }
}))

const ChangePasswordForm = (_, ref) => {
  const classes = useStyles()
  const history = useHistory()
  const { userId } = useParams()
  const [fields, setFields] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
  const [equalError, setEqualError] = useState(false)
  const [confirmError, setConfirmError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [handleChangePassword] = useMutation(CHANEG_PASSWORD, {
    variables: {
      id: userId,
      previousPassword: fields.oldPassword,
      newPassword: fields.newPassword
    }
  })

  const handleChange = event => {
    const { name, value } = event.target
    setFields({
      ...fields,
      [name]: value
    })
  }

  const comparePasswords = () => {
    const { oldPassword, newPassword, confirmNewPassword } = fields
    if (newPassword && oldPassword === newPassword)
      setEqualError(true)
    else
      setEqualError(false)

    if (confirmNewPassword && newPassword !== confirmNewPassword)
      setConfirmError(true)
    else
      setConfirmError(false)
  }

  const handleReset = () => {
    setFields({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
  }

  const handleBack = () => {
    //handleReset()
    history.goBack()
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

  const handleSubmit = async event => {
    event.preventDefault()
    const changePasswordResp = await handleChangePassword()
    const { ok, errors } = changePasswordResp.data.changePassword
    if (ok) {
      alert('Senha alterada com sucesso!')
      history.push('/login')
    } else {
      setErrorMessage(errors[0].message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.errorMessage}>{errorMessage}</div>
      <div className={classes.fields}>
        <TextField
          type="password"
          className={classes.formFields}
          name="oldPassword"
          value={fields.oldPassword || ''}
          onChange={handleChange}
          label="Senha atual"
          size="small"
        />

        <TextField
          type="password"
          className={classes.formFields}
          name="newPassword"
          value={fields.newPassword || ''}
          onChange={handleChange}
          onBlur={comparePasswords}
          label="Nova senha"
          size="small"
          error={confirmError || equalError}
          helperText={equalError && "A nova senha não pode ser igual à anterior!"}

        />

        <TextField
          type="password"
          className={classes.formFields}
          name="confirmNewPassword"
          value={fields.confirmNewPassword || ''}
          onChange={handleChange}
          onBlur={comparePasswords}
          label="Confirme a nova senha"
          size="small"
          error={confirmError}
        />

        {/* {confirmError && <div className={classes.confirmationError}>A confirmação da senha está incorreta!</div>} */}
        {confirmError && <div className={classes.confirmationError}>A confirmação da senha está incorreta!</div>}
      </div>

      <div className={classes.formButtons}>
        <Button
          className={classes.formButton}
          type="reset"
          variant="contained"
          size="small"
          onClick={handleBack}
        >Cancelar</Button>

        <Button
          className={classes.formButton}
          type="submit"
          variant="contained"
          color="primary"
          size="small"
        >Salvar</Button>
      </div>
    </form>
  )
}

export default forwardRef(ChangePasswordForm)