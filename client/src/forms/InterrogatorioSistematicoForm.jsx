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
  Checkbox,
  TextField
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

  textArea: {
    width: '100%',
    marginBottom: '10px'
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
  //const [complementosQueixas, setComplementosQueixas] = React.useState([])

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

/*   const complementosQueixasResponse = useQuery(COMPLEMENTOS_QUEIXAS_BY_CONSULTA, {
    variables: { consultaId: consulta.id },
    onCompleted: (data) => {
      setComplementosQueixas(data.complementosQueixasByConsulta)
    },
    skip: !consulta.id
  }) */

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

  const handleChangeComplementos = (event) => {
    const { id, value } = event.target
    const exists = consulta.complementosQueixas?.some(item => item.tipoQueixa.id === id)

    if (exists) {
      const thisComplemento = consulta.complementosQueixas.find(item => item.tipoQueixa.id === id)
      const others = consulta.complementosQueixas.filter(item => item.tipoQueixa.id !== id)

      setConsulta({
        ...consulta,
        complementosQueixas: [
          ...others,
          { ...thisComplemento, complemento: value }
        ]
      })
    } else {
      setConsulta({
        ...consulta,
        complementosQueixas: consulta.complementosQueixas ? [
          ...consulta.complementosQueixas,
          { complemento: value, tipoQueixa: { id } }
        ] : [
          { complemento: value, tipoQueixa: { id } }
        ]
      })
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
      {tiposQueixa.map(tipo => {
        const complementoQueixa = consulta.complementosQueixas?.find(item => item.tipoQueixa.id === tipo.id)
        return (
        <Box className={classes.fieldSet} key={tipo.id} component="fieldset">
          <legend className={classes.legend}>Queixas {tipo.nome}</legend>
          <div>
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
          </div>
          <TextField
            className={classes.textArea}
            id={tipo.id}
            name="complementoQueixa"
            defaultValue={complementoQueixa?.complemento || ''}
            onBlur={handleChangeComplementos}
            multiline
            //rows={2}
            variant="filled"
            label="Observações"
            /* inputProps={{
              readOnly: disabled
            }} */
          />
          {!isLast(tiposQueixa, tipo) && <Divider className={classes.divider} />}
        </Box>)
      })}
    </div>
  )
}

export default InterrogatorioSistematicoForm