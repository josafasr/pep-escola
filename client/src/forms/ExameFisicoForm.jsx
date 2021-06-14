/**
 * @title Formulário para criação/edição dos dados do exame físico
 * @module src/forms/ExameFisicoForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import {
  makeStyles,
  Paper,
  Divider,
  FormControlLabel,
  Checkbox,
  TextField
} from '@material-ui/core'

import ConsultaContext from '../contexts/ConsultaContext'
import { TIPOS_EXAME_FISICO, EXAMES_FISICOS } from '../graphql/exame-fisico'

const useStyles = makeStyles((theme) => ({
  exames: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(770)]: {
      display: 'grid',
      gridTemplateColumns: '50% 50%',
      marginTop: '10px'
    }
  },

  tipo: {
    display: 'flex',
    margin: '10px 0'
  },

  fieldSet: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderStyle: 'none',
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
    display: 'none',
    backgroundColor: 'black',
    [theme.breakpoints.up(770)]: {
      display: 'initial'
    }
  }
}))

const ExameFisicoForm = () => {
  const classes = useStyles()
  const [consulta, setConsulta] = React.useContext(ConsultaContext)
  const [tiposExameFisico, setTiposExameFisico] = React.useState([])
  const [examesFisicos, setExamesFisicos] = React.useState([])

  useQuery(TIPOS_EXAME_FISICO, {
    onCompleted: (data) => {
      setTiposExameFisico(data.tiposExameFisico)
    }
  })

  const examesFisicosResponse = useQuery(EXAMES_FISICOS, {
    onCompleted: (data) => {
      setExamesFisicos(data.examesFisicos)
    }
  })

  const isChecked = (exameFisico) => {
    if (consulta.exameFisico) {
      for (const item of consulta.exameFisico) {
        if (item.id === exameFisico.id) {
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
      toCheck = examesFisicos.filter(exame => (exame.id === id))
      setConsulta({
        ...consulta,
        exameFisico: consulta.exameFisico ? [...consulta.exameFisico, toCheck[0]] : [toCheck[0]]
      })
    } else {
      toCheck = consulta.exameFisico.filter(exame => (exame.id !== id))
      setConsulta({ ...consulta, exameFisico: toCheck })
    }
  }

  const handleChangeComplementos = (event) => {
    const { id, value } = event.target
    if (id && value) {
      const tipoId = parseInt(id)
      const exists = consulta.complementosExameFisico?.some(item => item.tipoExameFisico.id === tipoId)

      if (exists) {
        const thisComplemento = consulta.complementosExameFisico.find(item => item.tipoExameFisico.id === tipoId)
        const others = consulta.complementosExameFisico.filter(item => item.tipoExameFisico.id !== tipoId)

        setConsulta({
          ...consulta,
          complementosExameFisico: [
            ...others,
            { ...thisComplemento, complemento: value }
          ]
        })
      } else {
        setConsulta({
          ...consulta,
          complementosExameFisico:
            consulta.complementosExameFisico
            ? [
                ...consulta.complementosExameFisico,
                { complemento: value, tipoExameFisico: { id: tipoId } }
              ]
            : [
                { complemento: value, tipoExameFisico: { id: tipoId } }
              ]
        })
      }
    }
  }

  const isLast = (array, item) => {
    const index = array.indexOf(item)
    //if (index === (array.length - 1)) {
      if (index % 2 !== 0) {
      return true
    }
    return false
  }

  if (examesFisicosResponse.loading) return 'Carregando...'
  if (examesFisicosResponse.error) return 'Erro :('

  return (
    <div className={classes.exames}>
      {tiposExameFisico.map(tipo => {
        const readOnly = !!consulta.id
        const complementoExameFisico = consulta.complementosExameFisico?.find(item => item.tipoExameFisico.id === tipo.id)
        return (
          <div className={classes.tipo} key={tipo.id}>
            <Paper className={classes.fieldSet} component="fieldset">
              <legend className={classes.legend}>Alterações {tipo.nome === 'Geral' ? 'Gerais' : tipo.nome}:</legend>
              {examesFisicos.filter(item => (item.tipoExameFisico.id === tipo.id))
                .map(exame =>
                  <FormControlLabel
                    className={classes.checkLabel}
                    key={exame.id}
                    control={
                      <Checkbox
                        className={classes.checkbox}
                        id={exame.id}
                        onChange={!readOnly ? handleChange : undefined}
                        checked={isChecked(exame)}
                        //color="primary"
                        size="small"
                      />
                    }
                    label={exame.nome}
                  />
                )
              }
              <TextField
                id={tipo.id}
                name="complementoExameFisico"
                defaultValue={complementoExameFisico?.complemento || ''}
                onBlur={!readOnly ? handleChangeComplementos : undefined}
                multiline
                variant="filled"
                label="Observações"
                size="small"
                inputProps={{
                  readOnly: readOnly
                }}
              />
            </Paper>
            {!isLast(tiposExameFisico, tipo) && <Divider className={classes.divider} orientation="vertical" flexItem />}
          </div>)
      })}
    </div>
  )
}

export default ExameFisicoForm