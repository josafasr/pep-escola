import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { TextField, CircularProgress } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { QUEIXAS } from '../../graphql/queixa'
import QueixaContext from '../../contexts/QueixaContext'

export default function QueixaAutocomplete(props) {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const {queixa, setQueixa} = React.useContext(QueixaContext)
  const loading = open && options.length === 0  

  const [handleQueixas] = useLazyQuery(QUEIXAS, {
    onCompleted: (data) => {
      setOptions(data.queixas)
    },
    skip: !open
  })

  const handleChange = (event, value, reason) => {
    event.preventDefault()
    if (reason === 'select-option') {
      setQueixa(value)
    }
  }

  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    if (active) {
      handleQueixas()
    }

    return () => {
      active = false
    }
  }, [loading, handleQueixas])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      id="asinchronous-query"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      value={queixa}
      onChange={handleChange}
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={(option) => option.nome}
      options={options}
      loading={loading}
      loadingText="Carregando..."
      renderInput={(params) => (
        <TextField
          {...params}
          label="Queixa principal"
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  )
}