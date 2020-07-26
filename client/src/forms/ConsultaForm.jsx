/**
 * @title Formulário para criação/edição dos dados de consultas
 * @module src/forms/ConsultaForm
 * @author Josafá Santos dos Reis
 */

 import React from 'react'
 import clsx from 'clsx'
 import {
  makeStyles,
  TextField
} from '@material-ui/core'

import QueixaAutocomplete from '../components/autocomplete/QueixaAutocomplete'
import QueixaContext from '../contexts/QueixaContext'

const useStyles = makeStyles((theme) => ({
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    historiaDoencaAtual: ''
  })
  const {queixa, setQueixa} = React.useContext(QueixaContext)

  const handleChange = event => {
    event.preventDefault()
    event.stopPropagation()
    const { name, value } = event.target
    setFields({
      ...fields,
      [name]: name.slice(-2) === 'Id' ? (parseInt(value) || '') : value
    })
    if (props.onChange) {
      props.onChange({ 'name': name, 'value': value })
    }
  }

  const handleReset = () => {
    setFields({
      acompanhante: '',
      queixaPrincipalObs: '',
      historiaDoencaAtual: '',
      queixas: []
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

  React.useEffect(() => {
    if (consultaData && Object.keys(consultaData).length > 0) {
      setFields({
        acompanhante: consultaData.acompanhante || '',
        queixaPrincipalObs: consultaData.queixaPrincipalObs || '',
        historiaDoencaAtual: consultaData.historiaDoencaAtual || ''
      })
    }
    if (Object.keys(queixa).length === 0) {
      if (consultaData.queixas && consultaData.queixas.length > 0) {
        setQueixa(consultaData.queixas[0])
      }
    }
  }, [consultaData, queixa, setQueixa])

  return (
    <div className={classes.formFields}>

      <QueixaAutocomplete />

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

    </div>
  )
}
export default React.forwardRef(ConsultaForm)