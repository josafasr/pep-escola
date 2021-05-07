/**
 * @title Formulário para controle de antecedentes 
 * patológicos do paciente
 * @module src/forms/AntecedentesPatologicosForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Divider
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import PacienteContext from '../contexts/PacienteContext'
import { TIPOS_PATOLOGIA, PATOLOGIAS } from '../graphql/patologia'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },

  header: {
    backgroundColor: '#ececec'
  },

  items: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: '10px',
    [theme.breakpoints.up(625)]: {
      flexDirection: 'row',
      paddingBottom: 0
    }
  },

  item: {
    width: '100%'
  },

  textField: {
    width: '100%'
  }
}))

const AntecedentesPatologicosForm = (props) => {
  const classes = useStyles()
  const { disabled } = props
  const [paciente, setPaciente] = React.useContext(PacienteContext)
  const [tiposPatologia, setTiposPatologia] = React.useState([])
  const [patologias, setPatologias] = React.useState([])

  useQuery(TIPOS_PATOLOGIA, {
    onCompleted: data => setTiposPatologia(data.tiposPatologia)
  })

  useQuery(PATOLOGIAS, {
    onCompleted: data => setPatologias(data.patologias)
  })

  const isChecked = patologiaId => {
    if (paciente && paciente.antecedentesPatologicos) {
      return paciente.antecedentesPatologicos.some(item =>
        item.id === patologiaId
      )
    }
    return false
  }

  const handleChange = event => {
    const { id, checked } = event.target
    let toCheck = []
    if (checked) {
      toCheck = patologias.filter(item => item.id === id)
      setPaciente({
        ...paciente,
        antecedentesPatologicos: paciente.antecedentesPatologicos ? 
        [...paciente.antecedentesPatologicos, toCheck[0]] :
        toCheck
      })
    } else {
      toCheck = paciente.antecedentesPatologicos.filter(item => item.id !== id)
      setPaciente({
        ...paciente,
        antecedentesPatologicos: toCheck
      })
    }
  }

  const changeText = event => {
    const { id, value } = event.target
    const antecedente = paciente.antecedentesPatologicos.find(item => item.id === id)
    const antecedentes = paciente.antecedentesPatologicos.filter(item => item.id !== id)
    setPaciente({
      ...paciente,
      antecedentesPatologicos: paciente.antecedentesPatologicos ? 
        [...antecedentes, { ...antecedente, tempoDiagnostico: value }] :
        [{ ...antecedente, tempoDiagnostico: value }]
    })
  }

  React.useEffect(() => {
    if (paciente) {
      console.log(paciente.antecedentesPatologicos)
    }
  }, [paciente])

  if (tiposPatologia.length < 1) {
    return null
  }

  return tiposPatologia.map(tipo =>
    <Accordion key={tipo.id}>
      <AccordionSummary
        className={classes.header}
        expandIcon={<ExpandMoreIcon />}
        id={`${tipo.id}`}
      >
        {tipo.nome}
      </AccordionSummary>
      <AccordionDetails className={classes.container}>
        {patologias.filter(patologia => patologia.tipoPatologia.id === tipo.id)
          .map(patologia =>
            <React.Fragment key={patologia.id}>
              <Grid className={classes.items} container>
                <Grid className={classes.item} item sm>
                  <FormControlLabel
                    key={patologia.id}
                    control={
                      <Checkbox
                        id={`${patologia.id}`}
                        onChange={handleChange}
                        checked={isChecked(patologia.id)}
                        size="small"
                      />
                    }
                    label={patologia.nome}
                  />
                </Grid>
                <Grid className={classes.item} item sm>
                  <TextField
                    className={classes.textField}
                    id={`${patologia.id}`}
                    defaultValue={patologia.tempoDiagnostico || ''}
                    onBlur={changeText}
                    label="Há quanto tempo?"
                    size="small"
                    />
                </Grid>
              </Grid>
              <Divider />
            </React.Fragment>
          )
        }
      </AccordionDetails>
    </Accordion>
  )
}

export default AntecedentesPatologicosForm