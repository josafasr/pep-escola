import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import {
  Chip,
  TextField
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { USUARIOS_BY_TEXT } from '../graphql/usuario'
import ConsultaContext from '../contexts/ConsultaContext'

const ResponsavelConsultaForm = () => {

  //const { disabled } = props
  const [inputValue, setInputValue] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [consulta, setConsulta] = React.useContext(ConsultaContext)
  const [reason, setReason] = React.useState('')
  let isLoading = open && inputValue.length > 2 && options.length === 0
  const [text, setText] = React.useState('')

  const [handleQuery] = useLazyQuery(USUARIOS_BY_TEXT, {
    onCompleted: (data) => {
      //isLoading = data.usuariosByText > 0
      console.log(isLoading);
      setOptions(data.usuariosByText)
    }
  })

  const handleChange = (event, value, reason, details) => {
    console.log(value);

    // Exclusão
    if (reason === 'remove-option') {
      const { option } = details
      const usuarios = consulta.responsaveis.filter(item => item !== option)      
      setConsulta({
        ...consulta,
        responsaveis: usuarios
      })
    }

    // Inclusão
    if (reason === 'select-option') {
      setConsulta({
        ...consulta,
        responsaveis: value
      })
      setInputValue('')
    }
  }

  const handleInputChange = (event, value, reason) => {
    setReason(reason)
    setText(value)

    if (event) {
      setInputValue(value)
    }
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

  return (
    <Autocomplete
      multiple={true}
      freeSolo={true}
      clearOnBlur={true}
      id="responsaveis-consulta"
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      loading={isLoading}
      loadingText="Carregando..."
      value={consulta.responsaveis || []}
      onChange={handleChange}
      inputValue={inputValue || ''}
      onInputChange={handleInputChange}
      options={options}
      getOptionLabel={option => option.pessoa.nome}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option.pessoa.nome}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          multiline
          variant="outlined"
          placeholder="Digite para inserir"
        />
      )}
    />
  )
}

export default ResponsavelConsultaForm