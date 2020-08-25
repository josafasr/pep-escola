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

import { QUEIXAS, TIPOS_QUEIXA, CREATE_QUEIXA } from '../../graphql/queixa'
import QueixaContext from '../../contexts/QueixaContext'

const filter = createFilterOptions();

export default function QueixaAutocomplete(props) {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const {queixa, setQueixa} = React.useContext(QueixaContext)

  const [value, setValue] = React.useState(QueixaContext);
  const [show, toggleShow] = React.useState(false)
  const loading = open && options.length === 0  

  const [handleQueixas] = useLazyQuery(QUEIXAS, {
    onCompleted: (data) => {
      setOptions(data.queixas)
    },
    skip: !open
  })

  const tiposQueixaResponse = useQuery(TIPOS_QUEIXA, {
    onCompleted: () => {
      if (queixa) {
        setDialogValue({ ...dialogValue, tipoQueixaId: queixa.id })
      }
    }
  })

  const loadTiposQueixa = () => {
    if (tiposQueixaResponse.loading) return 'Carregando...'
    if (tiposQueixaResponse.error) return 'Erro :('

    return (
      tiposQueixaResponse.data.tiposQueixa.map((item) => (
      <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
      ))
    )
  }

  const [handleCreateQueixa] = useMutation(CREATE_QUEIXA)

  const handleChange = (event, newValue, reason) => {
    event.preventDefault()
    if (reason === 'select-option') {
      setQueixa(newValue)
    }

    if (typeof newValue === 'string') {
      setTimeout(() => {
        toggleShow(true);
        setDialogValue({
          nome: newValue,
          tipoQueixaId: ''
        });
      });
    } else if (newValue && newValue.inputValue) {
      toggleShow(true);
      setDialogValue({
        nome: newValue.inputValue,
        tipoQueixaId: ''
      });
    } else {
      setValue(newValue)
    }
  }

  const handleClose = () => {
    setDialogValue({
      nome: '',
      tipoQueixaId: ''
    })

    toggleShow(false)
  }

  const [dialogValue, setDialogValue] = React.useState({
    nome: '',
    tipoQueixaId: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setValue({
      nome: dialogValue.nome,
      tipoQueixaId: dialogValue.tipoQueixaId
    })

    const createQueixaResponse = await handleCreateQueixa({
      variables: dialogValue
    })

    if (createQueixaResponse.data.createQueixa.ok) {
      handleClose()
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
    <React.Fragment>
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
        options={options}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              nome: `Adicionar "${params.inputValue}"`,
            });
          }

          return filtered;
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
            label="Queixa principal"
            size="small"
            InputProps={{
              ...params.InputProps,
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
          <DialogTitle id="form-dialog-title">Adicionar nova queixa</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Não encontrou a queixa na lista? Por favor, adicione!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.nome}
              onChange={(event) => setDialogValue({ ...dialogValue, nome: event.target.value })}
              label="Nome"
              type="text"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.tipoQueixaId}
              onChange={(event) => setDialogValue({ ...dialogValue, tipoQueixaId: event.target.value })}
              label="Tipo"
              select
            >
              <MenuItem value=""><em>Não Informado</em></MenuItem>
              {loadTiposQueixa()}
            </TextField>
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