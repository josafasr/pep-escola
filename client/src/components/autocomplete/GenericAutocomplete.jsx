import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import {
  TextField
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

const GenericAutocomplete = (props) => {
  const { id, value, disabled, query, responseName, label } = props
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [reason, setReason] = useState('')
  //const isLoading = open && options.length === 0 && inputValue.length > 2

  const [handleFatch] = useLazyQuery(query, {
    onCompleted: (data) => {
      setOptions(data[responseName])
    },
    skip: !open
  })

  const handleChange = (_, newValue, reason) => {
    if (reason === 'select-option') {
      props.onChange(newValue)
    }
  }

  const handleInputChange = (_, value, reason) => {
    setReason(reason)
    setInputValue(value)
  }

  useEffect(() => {
    if (reason === 'input') {
      if (inputValue && inputValue.length > 2) {
        const text = inputValue.substring(0, 1).toUpperCase().concat(inputValue.substring(1).toLowerCase())
        handleFatch({
          variables: {
            text: text
          }
        })
      }
    }
  }, [reason, handleFatch, inputValue])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <React.Fragment>
      <Autocomplete
        id={id}
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
        value={value || {}}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={options}
        getOptionSelected={(option, value) => option === value}
        getOptionLabel={option => option.nome || ''}
        renderOption={(option) => option.nome}
        //loading={isLoading}
        loadingText="Carregando..."
        clearOnBlur
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder="Digite para carregar"
            size="small"
            InputProps={{
              ...params.InputProps,
              readOnly: disabled,
              /* endAdornment: (
                <div>
                  {isLoading ? <CircularProgress color="inherit" size={30} /> : null}
                  {params.InputProps.endAdornment}
                </div>
              ) */
            }}
          />
        )}
      />
    </React.Fragment>
  )
}

export default GenericAutocomplete