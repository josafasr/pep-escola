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

import { TIPOS_LOGRADOURO } from '../graphql/tipo-logradouro'
import { CIDADES } from '../graphql/cidade'

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

  const { enderecoData, disabled } = props

  const classes = useStyles()

  const [fields, setFields] = React.useState({
    tipoLogradouroId: '',
    logradouro: enderecoData?.logradouro || '',
    numero: enderecoData?.numero || '',
    bairro: enderecoData?.bairro || '',
    complemento: enderecoData?.complemento || '',
    cep: enderecoData?.cep || '',
    cidadeId: ''
  })

  const tiposLogradouroResponse = useQuery(TIPOS_LOGRADOURO, {
    onCompleted: () => {
      if (enderecoData) {
        if (enderecoData.tipoLogradouroId) {
          setFields({ ...fields, tipoLogradouroId: enderecoData.tipoLogradouroId })
        } else if (enderecoData.tipoLogradouro) {
          setFields({ ...fields, tipoLogradouroId: enderecoData.tipoLogradouro.id })
        }
      }
    }
  })

  const cidadesResponse = useQuery(CIDADES, {
    onCompleted: () => {
      if (enderecoData) {
        if (enderecoData.cidadeId) {
          setFields({ ...fields, cidadeId: enderecoData.cidadeId })
        } else if (enderecoData.cidade) {
          setFields({ ...fields, cidadeId: enderecoData.cidade.id })
        }
      }
    }
  })

  const loadTiposLogradouro = () => {
    if (tiposLogradouroResponse.loading) return 'Loading...'
    if (tiposLogradouroResponse.error) return 'Error :('

    return (
      tiposLogradouroResponse.data.tiposLogradouro.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
      ))
    )
  }

  const loadCidades = () => {
    if (cidadesResponse.loading) return 'Loading...'
    if (cidadesResponse.error) return 'Error :('

    return (
      cidadesResponse.data.cidades.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
      ))
    )
  }

  const handleChange = event => {
    event.preventDefault()
    event.stopPropagation()
    const { name, value } = event.target

    setFields({
      ...fields,
      [name]: (name === 'numero' || name.slice(-2) === 'Id') ? (parseInt(value) || '') : value
    })
  }

  const handleReset = () => {
    setFields({
      tipoLogradouroId: '',
      logradouro: '',
      numero: '',
      bairro: '',
      complemento: '',
      cep: '',
      cidadeId: ''
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
        name="tipoLogradouroId"
        value={fields.tipoLogradouroId}
        onChange={handleChange}
        label="Tipo de Logradouro"
        select
        inputProps={{
          readOnly: disabled
        }}
      >
        <MenuItem value=""><em>Não Informado</em></MenuItem>
        {loadTiposLogradouro()}
      </TextField>

      <TextField
        className={clsx(classes.formFields, classes.fieldGrow)}
        name="logradouro"
        value={fields.logradouro}
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
        value={fields.numero}
        onChange={handleChange}
        label="Número"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="bairro"
        value={fields.bairro}
        onChange={handleChange}
        label="Bairro"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="complemento"
        value={fields.complemento}
        onChange={handleChange}
        label="Complemento"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="cep"
        value={fields.cep}
        onChange={handleChange}
        label="CEP"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="cidadeId"
        value={fields.cidadeId}
        onChange={handleChange}
        label="Cidade"
        inputProps={{
          readOnly: disabled
        }}
        select
      >
        <MenuItem value=""><em>Não Informado</em></MenuItem>
        {loadCidades()}
      </TextField>
    </div>
  )
}
export default React.forwardRef(EnderecoForm)
