import React from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import {
  makeStyles,
  Chip,
  TextField
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { TIPOS_REFEICAO, ALIMENTOS_BY_TEXT } from '../graphql/recordatorio-alimentar'
import ConsultaContext from '../contexts/ConsultaContext'

const useStyles = makeStyles((theme) => ({
  textArea: {
    width: '99%',
    margin: '10px 10px 0 0'
  }
}))

const RecordatorioAlimentarForm = (props) => {
  const classes = useStyles()
  const [inputValue, setInputValue] = React.useState({})
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [consulta, setConsulta] = React.useContext(ConsultaContext)
  const [reason, setReason] = React.useState('')
  //const isLoading = open && options.length === 0
  const isLoading = open && inputValue.length > 2 && options.length === 0
  const [text, setText] = React.useState('')
  const [targetId, setTargetId] = React.useState()

  const { loading, data, error } = useQuery(TIPOS_REFEICAO, {
    onCompleted: (data) => {
      data.tiposRefeicao.forEach(item => {
        const fieldName = `tipo-refeicao-${item.id}`
        setInputValue({ ...inputValue, [fieldName]: '' })
      })
    }
  })

  const [handleQuery] = useLazyQuery(ALIMENTOS_BY_TEXT, {
    onCompleted: (data) => {
      const recordatorio = data.alimentosByText.map(item => ({ alimento: item }))
      setOptions(recordatorio)
    }
  })

  const handleChange = (event, value, reason, details) => {
    let recordatorio = []
    const tipoRefeicaoId = event.target.id.split('-')[0]
    const tipoRefeicao = data.tiposRefeicao.filter(tipoRefeicao => (tipoRefeicao.id === tipoRefeicaoId))[0]

    // Exclusão
    if (reason === 'remove-option') {
      const { option } = details
      recordatorio = consulta.recordatorioAlimentar.filter(item => item !== option)      
      setConsulta({
        ...consulta,
        recordatorioAlimentar: recordatorio
      })
    }

    // Inclusão
    if (reason === 'select-option' || reason === 'create-option') {
    //   Recordatório vazio
      if (!consulta
        || !consulta.recordatorioAlimentar
        || (consulta.recordatorioAlimentar.length === 0)) {
        const items = value.map(item => {
    //     Opção disponível
          if (item.alimento) {
            return {
              alimento: item.alimento,
              tipoRefeicao: tipoRefeicao
            }
    //     Opção não disponível
          } else {
            return {
              alimento: {
                nome: item.toString()
              },
              tipoRefeicao: tipoRefeicao
            }
          }
        })
        setConsulta({
          ...consulta,
          recordatorioAlimentar: items
        })
      }
    //   Recordatório não vazio  
      if (consulta.recordatorioAlimentar && consulta.recordatorioAlimentar.length !== 0) {
        recordatorio = consulta.recordatorioAlimentar
          .filter(item => (item.tipoRefeicao.id !== tipoRefeicaoId))
        const items = value.map(item => {
    //     Opção disponível
          if (item.alimento) {
            if (item.id) {
              return item
            } else {
              return {
                alimento: item.alimento,
                tipoRefeicao: tipoRefeicao
              }
            }
    //     Opção não disponível
          } else {
            return {
              alimento: {
                nome: item.toString()
              },
              tipoRefeicao: tipoRefeicao
            }
          }
        })
        recordatorio = [...recordatorio, ...items]

        setConsulta({
          ...consulta,
          recordatorioAlimentar: recordatorio
        })
      }
      setInputValue({})
    }
  }

  const handleInputChange = (event, value, reason) => {
    setReason(reason)
    setText(value)
    if (event) {
      setTargetId(event.target.id)
      setInputValue({
        ...inputValue,
        [event.target.name]: value
      })
    }
  }

  const handleChangeComplemento = event => {
    setConsulta({
      ...consulta,
      complementoRecordatorioAlimentar: {
        ...consulta.complementoRecordatorioAlimentar,
        complemento: event.target.value
      }
    })
  }

  React.useEffect(() => {
    if (reason === 'input') {
      if (text && text.length > 2) {
        handleQuery({
          variables: { text }
        })
      }
    }
  }, [reason, handleQuery, text])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return loading ? (
    <p>Carregando...</p>
  ) : error ? (
    <p>Erro: error.message</p>
  ) : data && data.tiposRefeicao && <div style={{width: '100%'}}>
    
      {data.tiposRefeicao.map(tipoRefeicao => {
        const readOnly = !!consulta.id
        return (
          <React.Fragment key={tipoRefeicao.id}>
            <Autocomplete
              multiple={true}
              freeSolo={true}
              clearOnBlur={true}
              id={`${tipoRefeicao.id}-recordatorio-alimentar`}
              style={{
                margin: '11px 10px 0 0',
                padding: '0 10px 0 0'
              }}
              fullWidth
              open={targetId === `${tipoRefeicao.id}-recordatorio-alimentar`}
              onOpen={() => {
                setOpen(true)
              }}
              onClose={() => {
                setOpen(false)
              }}
              loading={isLoading}
              loadingText="Carregando..."
              value={consulta.recordatorioAlimentar?.filter(item =>
                item.tipoRefeicao.id === tipoRefeicao.id) || []
              }
              onChange={!readOnly ? handleChange : undefined}
              inputValue={inputValue[`tipo-refeicao-${tipoRefeicao.id}`] || ''}
              onInputChange={handleInputChange}
              options={options}
              getOptionLabel={option => option.alimento.nome}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    color="primary"
                    label={`${option.alimento.nome} ${!([0, undefined, null].includes(option.quantidade)) ? '('+option.quantidade+')' : ''}`}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  name={`tipo-refeicao-${tipoRefeicao.id}`}
                  variant="filled"
                  label={tipoRefeicao.nome}
                  placeholder="Digite para carregar"
                  disabled={readOnly}
                />
              )}
            />
          </React.Fragment>
        )
      })}

      <TextField
        className={classes.textArea}
        name="complementoRecordatorioAlimentar"
        defaultValue={consulta.complementoRecordatorioAlimentar?.complemento || ''}
        onBlur={handleChangeComplemento}
        multiline
        //fullWidth
        minrows={2}
        variant="filled"
        label="Observações"
        inputProps={{
          readOnly: !!consulta.id
        }}
      />
  </div>
}

export default RecordatorioAlimentarForm