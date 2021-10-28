import React from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import {
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  MenuItem
} from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

import { PROFISSOES_BY_TEXT, CREATE_PROFISSAO } from '../../graphql/profissao'
import PacienteContext from '../../contexts/PacienteContext'

const filter = createFilterOptions();

const ProfissaoAutocomplete = (props) => {

  const { disabled } = props
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [_, setValue] = React.useState({})

  const [inputValue, setInputValue] = React.useState('')
  const [reason, setReason] = React.useState()
  
  const [show, toggleShow] = React.useState(false)
  const [paciente, setPaciente] = React.useContext(PacienteContext)
  // const loading = open && options.length === 0 && inputValue.length 

  const [handleProfissoes, { networkStatus }] = useLazyQuery(PROFISSOES_BY_TEXT, {
    onCompleted: (data) => {
      setOptions(data.profissoesByText)
    },
    notifyOnNetworkStatusChange: true
  })

  const loading = networkStatus === 1

  // const tiposQueixaResponse = useQuery(TIPOS_QUEIXA)

  // const loadTiposQueixa = () => {
  //   if (tiposQueixaResponse.loading) return 'Carregando...'
  //   if (tiposQueixaResponse.error) return 'Erro :('

  //   return (
  //     tiposQueixaResponse.data.tiposQueixa.map((item) => (
  //     <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
  //     ))
  //   )
  // }

  const [handleCreate] = useMutation(CREATE_PROFISSAO)

  const [dialogValue, setDialogValue] = React.useState({ nome: '' })

  const handleChange = (_, newValue, reason) => {
    // event.preventDefault()
    if (reason === 'select-option') {
      setPaciente({ ...paciente, profissao: newValue })
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

    const { ok, profissao } = createResponse.data.createProfissao
    if (ok) {
      delete profissao['__typename']
      setPaciente({
        ...paciente,
        profissao: profissao
      })
      handleClose()
    }
  }

  React.useEffect(() => {
    let active = true

    if (active && (reason === 'input')) {
      if (inputValue && inputValue.length > 2) {
        const text = inputValue.substring(0, 1).toUpperCase().concat(inputValue.substring(1).toLowerCase())
        handleProfissoes({
          variables: {
            text: text
          }
        })
      }
    }

    return () => {
      active = false
    }
  }, [reason, inputValue, handleProfissoes])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <React.Fragment>
      <Autocomplete
        id="profissao-autocomplete"
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
        value={paciente?.profissao || ''}
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
            label="Profissão"
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
          <DialogTitle id="form-dialog-title">Adicionar nova profissão</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Não encontrou a profissão na lista? Por favor, adicione!
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
export default ProfissaoAutocomplete