import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import {
  makeStyles,
  TextField,
  CircularProgress
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { CIDADES_BY_TEXT } from '../../graphql/cidade'
import PacienteContext from '../../contexts/PacienteContext'

const useStyle = makeStyles((theme) => ({
  input: {
    padding: 0
  },

  inputField: {
    margin: theme.spacing(1, 0),
    minWidth: '240px',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 0, 0)
    }
  }
}))

export default function NaturalidadeAutocomplete() {
  const classes = useStyle()
  const [inputValue, setInputValue] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [paciente, setPaciente] = React.useContext(PacienteContext)
  const [reason, setReason] = React.useState('')
  //const isLoading = open && options.length === 0
  const isLoading = open && inputValue.length > 2 && options.length === 0 && paciente.naturalidade?.nome === ''

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
        handleNaturalidades({
          variables: {
            text: inputValue
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
        style={{ minWidth: '240px' }}
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        value={paciente.naturalidade || ''}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={options}
        getOptionSelected={(option, value) => option === value}
        getOptionLabel={option => option.nome || ''}
        renderOption={(option) => `${option.nome} - ${option.estado?.sigla}`}
        loading={isLoading}
        loadingText="Carregando..."
        freeSolo
        renderInput={(params) => (
          <TextField
            className={classes.inputField}
            {...params}
            label="Naturalidade"
            size="small"
            InputProps={{
              ...params.InputProps,
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