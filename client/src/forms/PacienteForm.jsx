/**
 * @title Formulário para criação/edição dos dados de pacientes
 * @module src/forms/PacienteForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import clsx from 'clsx'
import {
  makeStyles,
  CircularProgress,
  TextField,
  MenuItem
} from '@material-ui/core'

import { LOAD_DROP_DOWNS } from '../graphql/paciente'

import NaturalidadeAutocomplete from '../components/autocomplete/NaturalidadeAutocomplete'
import PacienteContext from '../contexts/PacienteContext'

const useStyles = makeStyles((theme) => ({
  fields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    }
  },

  formFields: {
    margin: theme.spacing(1, 0),
    minWidth: '240px',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1, 2, 0, 0)
    }
  },

  fieldGrow: {
    flexGrow: 1
  }
}))

function PacienteForm(props, ref) {

  const classes = useStyles()
  const { disabled } = props
  const [paciente, setPaciente] = React.useContext(PacienteContext)

  /**
   * Dados para povoar as listas dos campos do tipo select
   * Apenas após o povoamento das listas, os dados recebidos nas props do paciente são inseridos
   */  
  const { loading, data, error } = useQuery(LOAD_DROP_DOWNS)

  const handleReset = () => {
    setPaciente({
      prontuario: '',
      rg: '',
      cpf: '',
      cartaoFamilia: '',
      cns: '',
      agenteComunitario: '',
      encaminhadoPor: '',
      unidadeSaude: {},
      // nacionalidade: '',
      naturalidade: {},
      estadoCivil: {},
      religiao: {},
      corPele: {},
      escolaridade: {},
      tempoEstudo: {},
      profissao: {},
      situacaoProfissional: {}
    })
  }

  /**
   * Possibilita, ao component pai,
   * acesso a métodos deste component
   */
  React.useImperativeHandle(ref, () => ({
    handleReset: () => {
      handleReset()
    }
  }))

  const handleChange = (event) => {
    const { name, value } = event.target
    setPaciente(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  if (loading) return (<CircularProgress />)
  if (error) return 'Error :('

  return (
    <div className={classes.fields}>
      <TextField
        className={classes.formFields}
        name="prontuario"
        value={paciente?.prontuario || ''}
        onChange={handleChange}
        label="Nº Prontuário"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="rg"
        value={paciente?.rg || ''}
        onChange={handleChange}
        label="RG"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="cpf"
        value={paciente?.cpf || ''}
        onChange={handleChange}
        label="CPF"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="cartaoFamilia"
        value={paciente?.cartaoFamilia || ''}
        onChange={handleChange}
        label="Cartão Familia"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="cns"
        value={paciente?.cns || ''}
        onChange={handleChange}
        label="CNS"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={clsx(classes.formFields, classes.fieldGrow)}
        name="agenteComunitario"
        value={paciente?.agenteComunitario || ''}
        onChange={handleChange}
        label="ACS"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={clsx(classes.formFields, classes.fieldGrow)}
        name="encaminhadoPor"
        value={paciente?.encaminhadoPor || ''}
        onChange={handleChange}
        label="Encaminhado por"
        inputProps={{
          readOnly: disabled
        }}
      />

      <TextField
        className={classes.formFields}
        name="unidadeSaude"
        value={paciente?.unidadeSaude || ''}
        onChange={handleChange}
        label="Unidade de Saúde"
        inputProps={{
          readOnly: disabled
        }}
        select
        SelectProps={{
          renderValue: value => value.nome
        }}
      >
        {data.unidadesSaude.map((item) =>
          <MenuItem key={item.id} value={item}>{item.nome}</MenuItem>)}
      </TextField>

      <NaturalidadeAutocomplete
        disabled={disabled}
      />

      <TextField
        className={classes.formFields}
        name="estadoCivil"
        value={paciente?.estadoCivil || ''}
        onChange={handleChange}
        label="Estado Civil"
        inputProps={{
          readOnly: disabled
        }}
        select
        SelectProps={{
          renderValue: value => value.nome + ''
        }}
      >
        {data.estadosCivis.map((item) =>
          <MenuItem key={item.id} value={item}>{item.nome}</MenuItem>)}
      </TextField>

      <TextField
        className={classes.formFields}
        name="religiao"
        value={paciente?.religiao || ''}
        onChange={handleChange}
        label="Religião"
        inputProps={{
          readOnly: disabled
        }}
        select
        SelectProps={{
          renderValue: value => value.nome
        }}
      >
        {data.religioes.map((item) =>
          <MenuItem key={item.id} value={item}>{item.nome}</MenuItem>)}
      </TextField>

      <TextField
        className={classes.formFields}
        name="corPele"
        value={paciente?.corPele || ''}
        onChange={handleChange}
        label="Cor da Pele"
        inputProps={{
          readOnly: disabled
        }}
        select
        SelectProps={{
          renderValue: value => value.nome
        }}
      >
        {data.coresPele.map((item) =>
          <MenuItem key={item.id} value={item}>{item.nome}</MenuItem>)}
      </TextField>

      <TextField
        className={classes.formFields}
        name="escolaridade"
        value={paciente?.escolaridade || ''}
        onChange={handleChange}
        label="Escolaridade"
        inputProps={{
          readOnly: disabled
        }}
        select
        SelectProps={{
          renderValue: value => value.nome
        }}
      >
        {data.escolaridades.map((item) =>
          <MenuItem key={item.id} value={item}>{item.nome}</MenuItem>)}
      </TextField>

      <TextField
        className={classes.formFields}
        name="tempoEstudo"
        value={paciente?.tempoEstudo || ''}
        onChange={handleChange}
        label="Tempo de estudo"
        inputProps={{
          readOnly: disabled
        }}
        select
        SelectProps={{
          renderValue: value => value.nome
        }}
      >
        {data.temposEstudo.map((item) =>
          <MenuItem key={item.id} value={item}>{item.nome}</MenuItem>)}
      </TextField>

      <TextField
        className={classes.formFields}
        name="profissao"
        value={paciente?.profissao || ''}
        onChange={handleChange}
        label="Profissão"
        inputProps={{
          readOnly: disabled
        }}
        // autocomplete
        select
        SelectProps={{
          renderValue: value => value.nome
        }}
      >
        {data.profissoes.map((item) =>
          <MenuItem key={item.id} value={item}>{item.nome}</MenuItem>)}
      </TextField>

      <TextField
        className={classes.formFields}
        name="situacaoProfissional"
        value={paciente?.situacaoProfissional || ''}
        onChange={handleChange}
        label="Situação Ocupacional"
        inputProps={{
          readOnly: disabled
        }}
        select
        SelectProps={{
          renderValue: value => value.nome
        }}
      >
        {data.situacoesProfissionais.map((item) =>
          <MenuItem key={item.id} value={item}>{item.nome}</MenuItem>)}
      </TextField>
    </div>
  )
}
export default React.forwardRef(PacienteForm)
