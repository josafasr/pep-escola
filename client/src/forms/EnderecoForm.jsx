/**
 * @title Formulário para criação/edição dos dados de endereço
 * @module src/forms/EnderecoForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import clsx from 'clsx'
import {
  makeStyles,
  TextField,
  MenuItem
} from '@material-ui/core'

import { LOAD_DROP_DOWNS } from '../graphql/endereco'
import EnderecoContext from '../contexts/EnderecoContext'

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

  boxTitle: {
    paddingTop: '10px',
    fontWeight: 'bold'
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

function EnderecoForm(props, ref) {

  const { disabled } = props

  const classes = useStyles()

  const {endereco, setEndereco} = React.useContext(EnderecoContext)

  const { loading, data, error } = useQuery(LOAD_DROP_DOWNS)

  const handleChange = event => {
    const { name, value } = event.target
    setEndereco(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleReset = () => {
    setEndereco({
      tipoLogradouro: {},
      logradouro: '',
      numero: '',
      bairro: '',
      complemento: '',
      cep: '',
      cidade: {}
    })
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

  if (loading) return 'Carregando...'
  if (error) return 'Erro :('

  return (
    <div className={classes.fields}>
      <TextField
        className={classes.formFields}
        name="tipoLogradouro"
        value={endereco?.tipoLogradouro || ''}
        onChange={handleChange}
        label="Tipo de Logradouro"
        select
        inputProps={{
          readOnly: disabled
        }}
        SelectProps={{
          renderValue: value => value.nome
        }}
      >
        {/* <MenuItem value=""><em>Não Informado</em></MenuItem> */}
        {data.tiposLogradouro.map((item) => (
          <MenuItem key={item.id} value={item}>{item.nome}</MenuItem>
        ))}
      </TextField>

      <TextField
        className={clsx(classes.formFields, classes.fieldGrow)}
        name="logradouro"
        value={endereco?.logradouro || ''}
        onChange={handleChange}
        label="Logradouro"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        type="number"
        name="numero"
        value={endereco?.numero || ''}
        onChange={handleChange}
        label="Número"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="bairro"
        value={endereco?.bairro || ''}
        onChange={handleChange}
        label="Bairro"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="complemento"
        value={endereco?.complemento || ''}
        onChange={handleChange}
        label="Complemento"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="cep"
        value={endereco?.cep || ''}
        onChange={handleChange}
        label="CEP"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="cidade"
        value={endereco?.cidade || ''}
        onChange={handleChange}
        label="Cidade"
        inputProps={{
          readOnly: disabled
        }}
        SelectProps={{
          renderValue: value => value.nome
        }}
        select
      >
        {/* <MenuItem value=""><em>Não Informado</em></MenuItem> */}
        {data.cidades.map((item) => (
          <MenuItem key={item.id} value={item}>{item.nome}</MenuItem>
        ))}
      </TextField>
    </div>
  )
}
export default React.forwardRef(EnderecoForm)
