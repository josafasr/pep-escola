/**
 * @description Formulário para controle de antecedentes
 * @module src/forms/AntecedentesForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import {
  makeStyles,
  TextField,
  LinearProgress
} from '@material-ui/core'

import ConsultaContext from '../contexts/ConsultaContext'
import { TIPOS_ANTECEDENTE_WITH_ASSOCIATIONS } from '../graphql/antecedente'
import { PRIMEIRA_CONSULTA_OF_PACIENTE } from '../graphql/consulta'

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
    width: '100%',
    margin: '0 5px'
  },

  textField: {
    width: '100%'
  },

  textArea: {
    marginTop: '10px'
  },

  buttomOpenDialog: {
    width: '100%',
    margin: '0 0 10px 10px',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  }
}))

const AntecedentesForm = () => {
  const classes = useStyles()
  const { pacienteId } = useParams()
  const [consulta, setConsulta] = React.useContext(ConsultaContext)
  const [tiposAntecedente, setTiposAntecedente] = React.useState([])
  // const [antecedentes, setAntecedentes] = React.useState([])
  const [readOnly, setReadOnly] = React.useState(true)

  const { loading, data } = useQuery(PRIMEIRA_CONSULTA_OF_PACIENTE, {
    variables: {
      pacienteId: pacienteId ? pacienteId : consulta.paciente.id
    },
    onCompleted: data => {
      if (data.primeiraConsultaOfPaciente !== null) {
        setConsulta({
          ...consulta,
          // antecedentesAtributos: data.primeiraConsultaOfPaciente.antecedentesAtributos
          complementosAntecedentes: data.primeiraConsultaOfPaciente.complementosAntecedentes
        })
      }
    }
  })

  useQuery(TIPOS_ANTECEDENTE_WITH_ASSOCIATIONS, {
    onCompleted: data => {
      setTiposAntecedente(data.tiposAntecedenteWithAssociations)
      // const antecedenteArrays = data.tiposAntecedenteWithAssociations.map(tipoAntecedente => {
      //   return [].concat(tipoAntecedente.antecedentes)
      // })
      // const antecedenteArray = [].concat(...antecedenteArrays)
      // setAntecedentes(antecedenteArray)
    }
  })

  const changeComplemento = event => {
    const { id, value } = event.target
    if (id && value) {
      const tipoId = parseInt(id)
      const complemento = consulta.complementosAntecedentes?.find(item => item.id === tipoId)
      const complementos = consulta.complementosAntecedentes?.filter(item => item.id !== tipoId)
      setConsulta({
        ...consulta,
        complementosAntecedentes:
          complementos
          ? [
              ...complementos,
              complemento
              ? {
                  ...complemento,
                  complemento: value
                }
                
              : {
                  tipoAntecedente: { id: tipoId },
                  complemento: value
                }
            ]
          : complemento
            ? [{
                ...complemento,
                complemento: value
              }]
            : [{
                tipoAntecedente: { id: tipoId },
                complemento: value
              }]
      })
    }
  }

  React.useEffect(() => {
    if (data && data.primeiraConsultaOfPaciente === null) {
      setReadOnly(false)
      setConsulta({
        ...consulta,
        primeira: true
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, readOnly])

  return (
    loading
    ? <LinearProgress color="secondary" />
    : (tiposAntecedente.length < 1)
      ? <LinearProgress color="secondary" />
      : <div className={classes.container}>
      {tiposAntecedente.map(tipo => {
        const complementoAntecedente = consulta.complementosAntecedentes?.find(item =>
          item.tipoAntecedente?.id === tipo.id
        )
        return (
          <TextField
            key={tipo.id}
            className={classes.textArea}
            id={`${tipo.id}`}
            defaultValue={complementoAntecedente?.complemento || ''}
            onBlur={changeComplemento}
            multiline
            minRows={2}
            label={tipo.nome}
            variant="filled"
            inputProps={{
              readOnly: readOnly
            }}
          />
        )
      })}
    </div>
  )
}

export default AntecedentesForm