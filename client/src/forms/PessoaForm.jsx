/**
 * @title Formulário para criação/edição dos dados pessoais
 * @module src/forms/PessoaForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import clsx from 'clsx'
import {
  makeStyles,
  TextField,
  MenuItem
} from '@material-ui/core'

import PessoaContext from '../contexts/PessoaContext'

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
  },

  fieldGrow: {
    flexGrow: 1
  }
}))

function PessoaForm(props, ref) {

  const classes = useStyles()

  const { disabled } = props
  const {pessoa, setPessoa} = React.useContext(PessoaContext)

  const handleChange = event => {
    const { name, value } = event.target
    setPessoa(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleReset = () => {
    setPessoa({ nome: '', dataNascimento: '', sexo: '' })
  }

  /**
   * Possibilita, ao component pai,
   * acesso a métodos deste component
   */
  React.useImperativeHandle(ref, () => ({
    handleReset: () => {
      handleReset()
    },
    handleChange: () => {
      handleChange()
    }
  }))

  return (
    <div className={classes.fields}>
      <TextField
        className={clsx(classes.formFields, classes.fieldGrow)}
        name="nome"
        value={pessoa.nome || ''}
        onChange={handleChange}
        label="Nome"
        size="small"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="dataNascimento"
        value={pessoa.dataNascimento || ''}
        onChange={handleChange}
        label="Data Nascimento"
        placeholder="dd/mm/aaaa"
        size="small"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="sexo"
        value={pessoa.sexo || ''}
        onChange={handleChange}
        label="Sexo"
        size="small"
        select
        inputProps={{
          readOnly: disabled
        }}
      >
        <MenuItem key={0} value=""></MenuItem>
        <MenuItem key={1} value="Feminino">Feminino</MenuItem>
        <MenuItem key={2} value="Masculino">Masculino</MenuItem>
      </TextField>
    </div>
  )
}
export default React.forwardRef(PessoaForm)
