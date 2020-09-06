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

import { LOAD_DROP_DOWNS } from '../graphql/consulta'

import NaturalidadeAutocomplete from '../components/autocomplete/NaturalidadeAutocomplete'
import PacienteContext from '../contexts/PacienteContext'

const useStyles = makeStyles((theme) => ({

  boxFieldset: {
    borderStyle: 'none'
  },

  fields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    }
  },

  boxTitle: {
    paddingTop: '10px',
    fontWeight: 'bold'
  },

  formFields: {
    margin: theme.spacing(1, 0),
    minWidth: '240px',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 0, 0)
    }
  },

  fieldGrow: {
    flexGrow: 1
  }
}))

function PacienteForm(props, ref) {

  const classes = useStyles()
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
        value={paciente.prontuario || ''}
        onChange={handleChange}
        label="Nº Prontuário"
      />

      <TextField
        className={classes.formFields}
        name="rg"
        value={paciente.rg || ''}
        onChange={handleChange}
        label="RG"
      />

      <TextField
        className={classes.formFields}
        name="cpf"
        value={paciente.cpf || ''}
        onChange={handleChange}
        label="CPF"
      />

      <TextField
        className={classes.formFields}
        name="cartaoFamilia"
        value={paciente.cartaoFamilia || ''}
        onChange={handleChange}
        label="Cartão Familia"
      />

      <TextField
        className={classes.formFields}
        name="cns"
        value={paciente.cns || ''}
        onChange={handleChange}
        label="CNS"
      />

      <TextField
        className={clsx(classes.formFields, classes.fieldGrow)}
        name="agenteComunitario"
        value={paciente.agenteComunitario || ''}
        onChange={handleChange}
        label="ACS"
      />

      <TextField
        className={clsx(classes.formFields, classes.fieldGrow)}
        name="encaminhadoPor"
        value={paciente.encaminhadoPor || ''}
        onChange={handleChange}
        label="Encaminhado por"
      />

      <TextField
        className={classes.formFields}
        name="unidadeSaude"
        value={paciente.unidadeSaude || ''}
        onChange={handleChange}
        label="Unidade de Saúde"
        select
        SelectProps={{
          renderValue: value => value.nome
        }}
      >
        {data.unidadesSaude.map((item) =>
          <MenuItem key={item.id} value={item}>{item.nome}</MenuItem>)}
      </TextField>

      <NaturalidadeAutocomplete />

      <TextField
        className={classes.formFields}
        name="estadoCivil"
        value={paciente.estadoCivil || ''}
        onChange={handleChange}
        label="Estado Civil"
        // autocomplete
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
        value={paciente.religiao || ''}
        onChange={handleChange}
        label="Religião"
        // autocomplete
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
        value={paciente.corPele || ''}
        onChange={handleChange}
        label="Cor da Pele"
        // autocomplete
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
        value={paciente.escolaridade || ''}
        onChange={handleChange}
        label="Escolaridade"
        // autocomplete
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
        name="profissao"
        value={paciente.profissao || ''}
        onChange={handleChange}
        label="Profissão"
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
        value={paciente.situacaoProfissional || ''}
        onChange={handleChange}
        label="Situação Profissional"
        // autocomplete
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
