import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import {
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

import { UNIDADES_SAUDE_BY_TEXT, CREATE_UNIDADE_SAUDE } from '../../graphql/unidade-saude'
import PacienteContext from '../../contexts/PacienteContext'

const filter = createFilterOptions();

const UnidadeSaudeAutocomplete = (props) => {

  const { disabled } = props
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [_, setValue] = useState({})

  const [inputValue, setInputValue] = useState('')
  const [reason, setReason] = useState()
  
  const [show, toggleShow] = useState(false)
  const [paciente, setPaciente] = useContext(PacienteContext)
  // const loading = open && options.length === 0 && inputValue.length 

  const [handleUnidadesSaude, { networkStatus }] = useLazyQuery(UNIDADES_SAUDE_BY_TEXT, {
    onCompleted: (data) => {
      setOptions(data.unidadesSaudeByText)
    },
    notifyOnNetworkStatusChange: true
  })

  const loading = networkStatus === 1

  const [handleCreate] = useMutation(CREATE_UNIDADE_SAUDE)

  const [dialogValue, setDialogValue] = useState({ nome: '' })

  const handleChange = (_, newValue, reason) => {
    if (reason === 'select-option') {
      setPaciente({ ...paciente, unidadeSaude: newValue })
    }

    if (typeof newValue === 'string') {
      setTimeout(() => {
        toggleShow(true);
        setDialogValue({ nome: newValue });
      });
    } else if (newValue && newValue.inputValue) {
      toggleShow(true);
      setDialogValue({ nome: newValue.inputValue });
    } else {
      setValue(newValue)
    }
  }

  const handleClose = () => {
    setDialogValue({ nome: '' })

    toggleShow(false)
  }

  const handleInputChange = (_, value, reason) => {
    setInputValue(value)
    setReason(reason)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setValue({ nome: dialogValue.nome })

    const createResponse = await handleCreate({
      variables: dialogValue
    })

    const { ok, unidadeSaude } = createResponse.data.createUnidadeSaude
    if (ok) {
      delete unidadeSaude['__typename']
      setPaciente({
        ...paciente,
        unidadeSaude: unidadeSaude
      })
      handleClose()
    }
  }

  useEffect(() => {
    let active = true

    if (active && (reason === 'input')) {
      const text = inputValue.substring(0, 1).toUpperCase().concat(inputValue.substring(1))
      if (inputValue && inputValue.length > 2) {
        handleUnidadesSaude({
          variables: {
            text: text
          }
        })
      }
    }

    return () => {
      active = false
    }
  }, [reason, inputValue, handleUnidadesSaude])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <React.Fragment>
      <Autocomplete
        id="unidade-saude"
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
        value={paciente?.unidadeSaude || ''}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={options}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue.length > 2 && options.length < 1) {
            filtered.push({
              inputValue: params.inputValue,
              nome: `Adicionar "${params.inputValue.substring(0, 1).toUpperCase().concat(params.inputValue.substring(1))}"`,
            });
          }

          return filtered
        }}
        getOptionSelected={(option, value) => option === value}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option
          }
          if (option.inputValue) {
            return option.inputValue
          }
          return option.nome
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.nome}
        loading={loading}
        loadingText="Carregando..."
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Unidade de Saúde"
            placeholder="Pesquisar..."
            size="small"
            InputProps={{
              ...params.InputProps,
              readOnly: disabled,
              endAdornment: (
                <div>
                  {loading ? <CircularProgress color="inherit" size={30} /> : null}
                  {params.InputProps.endAdornment}
                </div>
              )
            }}
          />
        )}
      />
      <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Adicionar nova Unidade</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Não encontrou a unidade na lista? Por favor, adicione!
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="name"
              value={dialogValue.nome}
              onChange={(event) => setDialogValue({ ...dialogValue, nome: event.target.value })}
              label="Nome"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}
export default UnidadeSaudeAutocomplete