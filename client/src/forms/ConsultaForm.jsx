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
//import AlimentoAutocomplete from '../components/autocomplete/AlimentoAutocomplete'
/* import {
  RecordatorioAlimentarReducer,
  RecordatorioAlimentarContext
} from '../components/state/recordatorio-alimentar/RecordatorioAlimentarReducer.js.sample' */
import ConsultaContext from '../contexts/ConsultaContext'

const useStyles = makeStyles((theme) => ({
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      //flexDirection: 'row',
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
  const { disabled } = props
  const [consulta, setConsulta] = React.useContext(ConsultaContext)
  //const [recAlimState, recAlimDispatch] = React.useReducer(RecordatorioAlimentarReducer)

  const handleChange = event => {
    const { name, value } = event.target
    setConsulta(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleReset = () => {
    setConsulta({
      acompanhante: '',
      queixaPrincipalObs: '',
      historiaDoencaAtual: ''//,
      //queixas: []
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

  /* React.useEffect(() => {
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
  }, [consultaData, queixa, setQueixa]) */

  return (
    <div className={classes.formFields}>

      <TextField
        className={clsx(classes.fields, classes.fieldGrow)}
        name="acompanhante"
        value={consulta.acompanhante || ''}
        onChange={handleChange}
        label="Acompanhante"
        inputProps={{
          readOnly: disabled
        }}
      />

      <QueixaAutocomplete
        disabled={disabled}
      />

      <TextField
        className={classes.textArea}
        name="queixaPrincipalObs"
        value={consulta.queixaPrincipalObs || ''}
        onChange={handleChange}
        multiline
        rows={3}
        variant="filled"
        label="Observações sobre a queixa principal"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.textArea}
        name="historiaDoencaAtual"
        value={consulta.historiaDoencaAtual || ''}
        onChange={handleChange}
        multiline
        rows={3}
        variant="filled"
        label="História da Doença Atual"
        inputProps={{
          readOnly: disabled
        }}
      />

      {/* <TextField
        className={classes.textArea}
        name="suspeitasDiagnosticas"
        value={consulta.suspeitasDiagnosticas || ''}
        onChange={handleChange}
        multiline
        rows={3}
        variant="filled"
        label="Suspeitas Diagnósticas"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.textArea}
        name="planoConduta"
        value={consulta.planoConduta || ''}
        onChange={handleChange}
        multiline
        rows={3}
        variant="filled"
        label="Plano (Conduta)"
        inputProps={{
          readOnly: disabled
        }}
      /> */}

      {/* <RecordatorioAlimentarContext.Provider value={{recAlimState, recAlimDispatch}}> */}
        {/* <AlimentoAutocomplete /> */}
      {/* </RecordatorioAlimentarContext.Provider> */}
    </div>
  )
}
export default React.forwardRef(ConsultaForm)