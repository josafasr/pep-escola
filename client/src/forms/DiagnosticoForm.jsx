/**
 * @title Formulário para edição das suspeitas diagnósticas das consultas
 * @module src/forms/DiagnosticoForm
 * @author Josafá Santos dos Reis
 */

 import React from 'react'
 import {
  makeStyles,
  TextField
} from '@material-ui/core'

import ConsultaContext from '../contexts/ConsultaContext'

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

function DiagnosticoForm(props, ref) {
  const classes = useStyles()
  const { disabled } = props
  const [consulta, setConsulta] = React.useContext(ConsultaContext)

  const handleChange = event => {
    const { name, value } = event.target
    setConsulta(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  /* const handleReset = () => {
    setConsulta({
      acompanhante: '',
      queixaPrincipalObs: '',
      historiaDoencaAtual: ''//,
      //queixas: []
    })
  } */

  /**
   * Possibilita, ao component pai, 
   * acesso a métodos deste component
   */
  /* React.useImperativeHandle(ref, () => ({
    handleReset: () => {
      handleReset()
    }
  })) */

  return (
    <div className={classes.formFields}>
      <TextField
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
      />
    </div>
  )
}
export default DiagnosticoForm