/**
 * @title Formulário para criação/edição dos dados do interrogatório sistemático
 * @module src/forms/InterrogatorioSistematicoForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import {
  makeStyles,
  Box,
  Divider,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'

import ConsultaContext from '../contexts/ConsultaContext'
import { TIPOS_QUEIXA, QUEIXAS } from '../graphql/queixa'

const useStyles = makeStyles((theme) => ({
  fieldSet: {
    height: 'auto',
    width: '100%',
    borderStyle: 'none'
  },

  legend: {
    fontWeight: 'bold'
  },

  checkLabel: {
    marginRight: theme.spacing(5)
  },

  checkbox: {
    marginRight: '0'
  },

  divider: {
    height: '1px',
    backgroundColor: 'black'
  }
}))

const InterrogatorioSistematicoForm = () => {
  const classes = useStyles()
  const [consulta, setConsulta] = React.useContext(ConsultaContext)
  const [tiposQueixa, setTiposQueixas] = React.useState([])
  const [queixas, setQueixas] = React.useState([])

  const tiposQueixaResponse = useQuery(TIPOS_QUEIXA, {
    onCompleted: (data) => {
      setTiposQueixas(data.tiposQueixa)
    }
  })

  const queixasResponse = useQuery(QUEIXAS, {
    onCompleted: (data) => {
      setQueixas(data.queixas)
    }
  })

  const isChecked = (queixa) => {
    if (consulta.queixas) {
      for (const item of consulta.queixas) {
        if (item.id === queixa.id) {
          return true
        }
      }
    }
    return false
  }

  const handleChange = (event) => {
    const { id, checked } = event.target
    let toCheck = []
    if (checked) {
      toCheck = queixas.filter(queixa => (queixa.id === id))
      setConsulta({
        ...consulta,
        queixas: consulta.queixas ? [...consulta.queixas, toCheck[0]] : [toCheck[0]]
      })
    } else {
      toCheck = consulta.queixas.filter(queixa => (queixa.id !== id))
      setConsulta({ ...consulta, queixas: toCheck })
    }
  }

  const isLast = (array, item) => {
    const index = array.indexOf(item)
    if (index === (array.length - 1)) {
      return true
    }
    return false
  }

  if (queixasResponse.loading) return 'Carregando...'
  if (queixasResponse.error) return 'Erro :('

  return (
    <div>
      {tiposQueixa.map(tipo =>
          <Box className={classes.fieldSet} key={tipo.id} component="fieldset">
            <legend className={classes.legend}>Queixas {tipo.nome}</legend>
            {queixas.filter(item => (item.tipoQueixa.id === tipo.id))
              .map(queixa =>
                <FormControlLabel
                  className={classes.checkLabel}
                  key={queixa.id}
                  control={
                    <Checkbox
                      className={classes.checkbox}
                      id={queixa.id}
                      onChange={handleChange}
                      checked={isChecked(queixa)}
                      color="primary"
                      size="small"
                    />
                  }
                  label={queixa.nome}
                />
              )
            }
            {!isLast(tiposQueixa, tipo) && <Divider className={classes.divider} />}
          </Box>
      )}
    </div>
  )
}

export default InterrogatorioSistematicoForm