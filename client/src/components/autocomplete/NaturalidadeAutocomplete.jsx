import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import {
  TextField,
  CircularProgress
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { CIDADES_BY_TEXT } from '../../graphql/cidade'
import PacienteContext from '../../contexts/PacienteContext'

export default function NaturalidadeAutocomplete(props) {

  const { disabled } = props
  const [inputValue, setInputValue] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [paciente, setPaciente] = React.useContext(PacienteContext)
  const [reason, setReason] = React.useState('')
  //const isLoading = open && options.length === 0
  const isLoading = open && inputValue.length > 2 && options.length === 0 && paciente?.naturalidade?.nome === ''

  const [handleNaturalidades] = useLazyQuery(CIDADES_BY_TEXT, {
    onCompleted: (data) => {
      setOptions(data.cidadesByText)
    },
    skip: !open
  })

  const handleChange = (event, newValue, reason) => {
    event.preventDefault()
    if (reason === 'select-option') {
      setPaciente({ ...paciente, naturalidade: newValue })
    }
  }

  const handleInputChange = (event, value, reason) => {
    if (event) {
      event.preventDefault()
    }
    setReason(reason)
    setInputValue(value)
  }

  React.useEffect(() => {
    if (reason === 'input') {
      if (inputValue && inputValue.length > 2) {
        const text = inputValue.substring(0, 1).toUpperCase().concat(inputValue.substring(1).toLowerCase())
        handleNaturalidades({
          variables: {
            text: text
          }
        })
      }
    }
  }, [reason, handleNaturalidades, inputValue])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <React.Fragment>
      <Autocomplete
        id="naturalidade-autocomplete"
        style={{
          margin: '11px 10px 0 0',
          padding: '0 10px 0 0',
          minWidth: '240px'
        }}
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        value={paciente?.naturalidade || ''}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={options}
        getOptionSelected={(option, value) => option === value}
        getOptionLabel={option => option.nome || ''}
        renderOption={(option) => `${option.nome} - ${option.estado?.sigla}`}
        loading={isLoading}
        loadingText="Carregando..."
        clearOnBlur
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Naturalidade"
            placeholder="Digite para carregar"
            size="small"
            InputProps={{
              ...params.InputProps,
              readOnly: disabled,
              endAdornment: (
                <div>
                  {isLoading ? <CircularProgress color="inherit" size={30} /> : null}
                  {params.InputProps.endAdornment}
                </div>
              )
            }}
          />
        )}
      />
    </React.Fragment>
  )
}