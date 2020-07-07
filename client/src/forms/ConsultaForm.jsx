/**
 * @title Formulário para criação/edição dos dados de consultas
 * @module src/forms/ConsultaForm
 * @author Josafá Santos dos Reis
 */

 import React from 'react'
 import { useQuery } from '@apollo/react-hooks'
 import clsx from 'clsx'
 import {
  makeStyles,
  // Box,
  // Typography,
  TextField,
  // FormControl,
  // InputLabel,
  // Input,
  // Select,
  MenuItem
} from '@material-ui/core'

import { QUEIXAS } from '../graphql/queixa'

const useStyles = makeStyles((theme) => ({
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(0, 2),
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    }
  },

  fields: {
    margin: theme.spacing(1, 0),
    minWidth: '240px',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 0, 0)
    }
  },

  textArea: {
    width: '100%',
    margin: theme.spacing(2, 0)
  },

  fieldGrow: {
    flexGrow: 1
  }
}))

function ConsultaForm(props, ref) {

  const classes = useStyles()
  const { consultaData } = props

  const [fields, setFields] = React.useState({
    acompanhante: '',
    queixaPrincipalId: '',
    queixaPrincipalObs: '',
    historiaDoencaAtual: '',
    //pacienteId: ''
  })

  const queixasResponse = useQuery(QUEIXAS, {
    onCompleted: () => {
      if (consultaData) {
        if (consultaData.queixaPrincipalId) {
          setFields({ ...fields, queixaPrincipalId: consultaData.queixaPrincipalId })
        } else if (consultaData.queixas) {
          setFields({ ...fields, queixaPrincipalId: consultaData.queixas[0].id })
        }
      }
    }
  })

  const loadQueixas = () => {
    if (queixasResponse.loading) return 'Loading...'
    if (queixasResponse.error) return 'Error :('

    return (
      queixasResponse.data.queixas.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
      ))
    )
  }

  const handleChange = event => {
    event.preventDefault()
    event.stopPropagation()
    const { name, value } = event.target

    //setFields({
    //  ...fields,
      // [name]: name.slice(-2) === 'Id' ? (parseInt(value) || '') : value
    //  [name]: value
    //})

    setFields(prevValues => ({
      ...prevValues,
      [name]: name.slice(-2) === 'Id' ? (parseInt(value) || '') : value
    }))
    if (props.onChange) {
      //const newName = name.replace('Id', '')
      props.onChange({ 'name': name, 'value': value })
    }
  }

  const handleReset = () => {
    setFields({
      acompanhante: '',
      queixaPrincipalId: '',
      queixaPrincipalObs: '',
      historiaDoencaAtual: '',
      //pacienteId: ''
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
  /* React.useEffect(() => {
    if (props.onChange) {
      props.onChange(fields)
    }
  }, [props, fields]) */

  React.useEffect(() => {
    if (consultaData && Object.keys(consultaData).length > 0) {
      setFields({
        acompanhante: consultaData.acompanhante || '',
        queixaPrincipalId: consultaData.queixaPrincipalId || '',
        queixaPrincipalObs: consultaData.queixaPrincipalObs || '',
        historiaDoencaAtual: consultaData.historiaDoencaAtual || ''
      })
    }
  }, [consultaData])

  return (
    <div className={classes.formFields}>
      <TextField
        className={classes.fields}
        name="queixaPrincipalId"
        value={fields.queixaPrincipalId}
        onChange={handleChange}
        label="Queixa Principal"
        // criar autocomplete
        select
      >
        <MenuItem value=""><em>Não informado</em></MenuItem>
        {loadQueixas()}
      </TextField>

      <TextField
        className={classes.textArea}
        name="queixaPrincipalObs"
        value={fields.queixaPrincipalObs}
        onChange={handleChange}
        multiline
        rows={3}
        variant="filled"
        label="Observações sobre a queixa principal"
      />

      <TextField
        className={clsx(classes.fields, classes.fieldGrow)}
        name="acompanhante"
        value={fields.acompanhante}
        onChange={handleChange}
        label="Acompanhante"
      />

      <TextField
        className={classes.textArea}
        name="historiaDoencaAtual"
        value={fields.historiaDoencaAtual}
        onChange={handleChange}
        multiline
        rows={3}
        variant="filled"
        label="História da Doença Atual"
      />

      {/* <TextField
        className={classes.fields}
        name="acompanhante"
        value={fields.acompanhante}
        onChange={handleChange}
        label="Acompanhante"
      /> */}
    </div>
  )
}
export default React.forwardRef(ConsultaForm)