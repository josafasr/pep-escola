/**
 * Formulário para criação/edição dos dados de pacientes
 * @module src/forms/PacienteForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import clsx from 'clsx'
import {
  makeStyles,
  Box,
  // Typography,
  TextField,
  // FormControl,
  // InputLabel,
  // Input,
  // Select,
  MenuItem
} from '@material-ui/core'

import { UNIDADES_SAUDE } from '../graphql/unidade-saude'
import { CIDADES } from '../graphql/cidade'
import { ESTADOS_CIVIS } from '../graphql/estado-civil'
import { RELIGIOES } from '../graphql/religiao'
import { CORES_PELE } from '../graphql/cor-pele'
import { ESCOLARIDADES } from '../graphql/escolaridade'
import { PROFISSOES } from '../graphql/profissao'
import { SITUACOES_PROFISSIONAIS } from '../graphql/situacao-profissional'
import { LOAD_DROP_BOXES } from '../graphql/paciente'

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

  const { pacienteData } = props

  const [fields, setFields] = React.useState({
    prontuario: '',
    rg: '',
    cpf: '',
    cartaoFamilia: '',
    cns: '',
    agenteComunitario: '',
    encaminhadoPor: '',
    // pessoa: '',
    unidadeSaudeId: '',
    // nacionalidadeId: '',
    naturalidadeId: '',
    estadoCivilId: '',
    religiaoId: '',
    corPeleId: '',
    escolaridadeId: '',
    profissaoId: '',
    situacaoProfissionalId: ''
  })

  // console.log(`pacienteData ${new Date().toLocaleTimeString()}: `, pacienteData)
  // console.log(`fields ${new Date().toLocaleTimeString()}: `, fields)

  /* const loadDropBoxes = useQuery(LOAD_DROP_BOXES, {
    onCompleted: () => {
      if (pacienteData) {
        setFields({
          ...fields,
          unidadeSaudeId: pacienteData.unidadeSaudeId,
          naturalidadeId: pacienteData.naturalidadeId,
          estadoCivilId: pacienteData.estadoCivilId,
          religiaoId: pacienteData.religiaoId,
          corPeleId: pacienteData.corPeleId,
          escolaridadeId: pacienteData.escolaridadeId,
          profissaoId: pacienteData.profissaoId,
          situacaoProfissionalId: pacienteData.situacaoProfissionalId
        })
      }
    }
  }) */

  /**
   * Funções para povoar as listas dos campos do tipo select
   * Apenas após o povoamento das listas, os dados recebidos na prop pacienteData são inseridos em fields
   */

  const unidadesSaudeResponse = useQuery(UNIDADES_SAUDE, {
    onCompleted: () => {
      if (pacienteData) {
        if (pacienteData.unidadeSaudeId) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.unidadeSaudeId)
          setFields({ ...fields, unidadeSaudeId: pacienteData.unidadeSaudeId})
        } else if (pacienteData.unidadeSaude) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.unidadeSaude)
          setFields({ ...fields, unidadeSaudeId: pacienteData.unidadeSaude.id})
        }
      }
    }
  })

  const naturalidadesResponse = useQuery(CIDADES, {
    onCompleted: () => {
      if (pacienteData) {
        if (pacienteData.naturalidadeId) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.naturalidadeId)
          setFields({ ...fields, naturalidadeId: pacienteData.naturalidadeId })
        } else if (pacienteData.naturalidade) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.naturalidade)
          setFields({ ...fields, naturalidadeId: pacienteData.naturalidade.id })
        }
      }
    }
  })

  const estadosCivisResponse = useQuery(ESTADOS_CIVIS, {
    onCompleted: () => {
      if (pacienteData) {
        if (pacienteData.estadoCivilId) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.estadoCivilId)
          setFields({ ...fields, estadoCivilId: pacienteData.estadoCivilId })
        } else if (pacienteData.estadoCivil) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.estadoCivil)
          setFields({ ...fields, estadoCivilId: pacienteData.estadoCivil.id })
        }
      }
    }
  })

  const religioesResponse = useQuery(RELIGIOES, {
    onCompleted: () => {
      if (pacienteData) {
        if (pacienteData.religiaoId) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.religiaoId)
          setFields({ ...fields, religiaoId: pacienteData.religiaoId })
        } else if (pacienteData.religiao) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.religiao)
          setFields({ ...fields, religiaoId: pacienteData.religiao.id })
        }
      }
    }
  })

  const coresPeleResponse = useQuery(CORES_PELE, {
    onCompleted: () => {
      if (pacienteData) {
        if (pacienteData.corPeleId) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.corPeleId)
          setFields({ ...fields, corPeleId: pacienteData.corPeleId })
        } else if (pacienteData.corPele) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.corPele)
          setFields({ ...fields, corPeleId: pacienteData.corPele.id })
        }
      }
    }
  })

  const escolaridadesResponse = useQuery(ESCOLARIDADES, {
    onCompleted: () => {
      if (pacienteData) {
        if (pacienteData.escolaridadeId) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.escolaridadeId)
          setFields({ ...fields, escolaridadeId: pacienteData.escolaridadeId })
        } else if (pacienteData.escolaridade) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.escolaridade)
          setFields({ ...fields, escolaridadeId: pacienteData.escolaridade.id })
        }
      }
    }
  })

  const profissoesResponse = useQuery(PROFISSOES, {
    onCompleted: () => {
      if (pacienteData) {
        if (pacienteData.profissaoId) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.profissaoId)
          setFields({ ...fields, profissaoId: pacienteData.profissao.id})
        } else if (pacienteData.profissao) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.profissao)
          setFields({ ...fields, profissaoId: pacienteData.profissao.id })
        }
      }
    }
  })

  const situacoesProfissionaisResponse = useQuery(SITUACOES_PROFISSIONAIS, {
    onCompleted: () => {
      if (pacienteData) {
        if (pacienteData.situacaoProfissionalId) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.situacaoProfissionalId)
          setFields({ ...fields, situacaoProfissionalId: pacienteData.situacaoProfissionalId })
        } else if (pacienteData.situacaoProfissional) {
          // console.log(`PacienteForm - ${new Date().toLocaleTimeString()}: `, pacienteData.situacaoProfissional)
          setFields({ ...fields, situacaoProfissionalId: pacienteData.situacaoProfissional.id })
        }
      }
    }
  })

  const loadUnidadesSaude = () => {
    if (unidadesSaudeResponse.loading) return 'Loading...'
    if (unidadesSaudeResponse.error) return 'Error :('

    return (
      unidadesSaudeResponse.data.unidadesSaude.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
      ))
    )
  }

  const loadNaturalidades = () => {
    if (naturalidadesResponse.loading) return 'Loading...'
    if (naturalidadesResponse.error) return 'Error :('

    return (
      naturalidadesResponse.data.cidades.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
      ))
    )
  }

  const loadEstadosCivis = () => {
    if (estadosCivisResponse.loading) return 'Loading...'
    if (estadosCivisResponse.error) return 'Error :('

    return (
      estadosCivisResponse.data.estadosCivis.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
      ))
    )
  }

  const loadReligioes = () => {
    if (religioesResponse.loading) return 'Loading...'
    if (religioesResponse.error) return 'Error :('

    return (
      religioesResponse.data.religioes.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
      ))
    )
  }

  const loadCoresPele = () => {
    if (coresPeleResponse.loading) return 'Loading...'
    if (coresPeleResponse.error) return 'Error :('

    return (
      coresPeleResponse.data.coresPele.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
      ))
    )
  }

  const loadEscolaridades = () => {
    if (escolaridadesResponse.loading) return 'Loading...'
    if (escolaridadesResponse.error) return 'Error :('

    return (
      escolaridadesResponse.data.escolaridades.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
      ))
    )
  }

  const loadProfissoes = () => {
    if (profissoesResponse.loading) return 'Loading...'
    if (profissoesResponse.error) return 'Error :('

    return (
      profissoesResponse.data.profissoes.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
      ))
    )
  }

  const loadSituacoesProfissionais = () => {
    if (situacoesProfissionaisResponse.loading) return 'Loading...'
    if (situacoesProfissionaisResponse.error) return 'Error :('

    return (
      situacoesProfissionaisResponse.data.situacoesProfissionais.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
      ))
    )
  }

  const handleReset = () => {
    setFields({
      prontuario: '',
      rg: '',
      cpf: '',
      cartaoFamilia: '',
      cns: '',
      agenteComunitario: '',
      encaminhadoPor: '',
      // pessoa: '',
      unidadeSaudeId: '',
      // nacionalidade: '',
      naturalidadeId: '',
      estadoCivilId: '',
      religiaoId: '',
      corPeleId: '',
      escolaridadeId: '',
      profissaoId: '',
      situacaoProfissionalId: ''
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
    event.preventDefault()
    event.stopPropagation()

    const { name, value } = event.target
    /* setFields({
      ...fields,
      [name]: name.slice(-2) === 'Id' ? (parseInt(value) || '') : value
    }) */
    setFields(prevValues => ({
      ...prevValues,
      [name]: name.slice(-2) === 'Id' ? (parseInt(value) || '') : value
    }))
    if (props.onChange) {
      //const newName = name.replace('Id', '')
      props.onChange({ 'name': name, 'value': value })
    }
  }
  
  /**
   * Emite aviso de mudança ao component pai
   */
  /* React.useEffect(() => {
    //console.log(`useEffect ${new Date().toLocaleTimeString()}: `, fields)
    if (props.onChange) {
      props.onChange(fields)
    }
  }, [props, fields]) */

  React.useEffect(() => {
    if (pacienteData && Object.keys(pacienteData).length > 0) {
      setFields({
        prontuario: pacienteData.prontuario || '',
        rg: pacienteData.rg || '',
        cpf: pacienteData.cpf || '',
        cartaoFamilia: pacienteData.cartaoFamilia || '',
        cns: pacienteData.cns || '',
        agenteComunitario: pacienteData.agenteComunitario || '',
        encaminhadoPor: pacienteData.encaminhadoPor || '',
        unidadeSaudeId: pacienteData.unidadeSaudeId || '',
        // nacionalidadeId: '',
        naturalidadeId: pacienteData.naturalidadeId || '',
        estadoCivilId: pacienteData.estadoCivilId || '',
        religiaoId: pacienteData.religiaoId || '',
        corPeleId: pacienteData.corPeleId || '',
        escolaridadeId: pacienteData.escolaridadeId || '',
        profissaoId: pacienteData.profissaoId || '',
        situacaoProfissionalId: pacienteData.situacaoProfissionalId || ''
      })
    }
    //console.log(`PacienteForm - pacienteData: ${new Date().toTimeString()}`, pacienteData)
    //console.log(`PacienteForm - fields: ${new Date().toTimeString()}`, fields)
  }, [pacienteData])


  return (
    <div className={classes.fields}>
      <TextField
        className={classes.formFields}
        name="prontuario"
        value={fields.prontuario}
        onChange={handleChange}
        label="Nº Prontuário"
      />

      <TextField
        className={classes.formFields}
        name="rg"
        value={fields.rg}
        onChange={handleChange}
        label="RG"
      />

      <TextField
        className={classes.formFields}
        name="cpf"
        value={fields.cpf}
        onChange={handleChange}
        label="CPF"
      />

      <TextField
        className={classes.formFields}
        name="cartaoFamilia"
        value={fields.cartaoFamilia}
        onChange={handleChange}
        label="Cartão Familia"
      />

      <TextField
        className={classes.formFields}
        name="cns"
        value={fields.cns}
        onChange={handleChange}
        label="CNS"
      />

      <TextField
        className={clsx(classes.formFields, classes.fieldGrow)}
        name="agenteComunitario"
        value={fields.agenteComunitario}
        onChange={handleChange}
        label="ACS"
      />

      <TextField
        className={clsx(classes.formFields, classes.fieldGrow)}
        name="encaminhadoPor"
        value={fields.encaminhadoPor}
        onChange={handleChange}
        label="Encaminhado por"
      />

      <TextField
        className={classes.formFields}
        name="unidadeSaudeId"
        value={fields.unidadeSaudeId}
        onChange={handleChange}
        label="Unidade de Saúde"
        select
      >
        <MenuItem value=""><em>Não Informado</em></MenuItem>
        {loadUnidadesSaude()}
      </TextField>

      {/* <FormControl className={classes.formFields}>
        <InputLabel id="input-label">Unidade de Saúde</InputLabel>
        <Select
          name="unidadeSaudeId"
          value={fields.unidadeSaudeId}
          onChange={handleChange}
          labelId="input-label"
        >
          <MenuItem value=""><em>Não Informado</em></MenuItem>
          {loadUnidadesSaude()}
        </Select>
      </FormControl> */}

      {/* <TextField
        className={classes.formFields}
        name="nacionalidadeId"
        value={fields.nacionalidadeId}
        onChange={handleChange}
        label="Nacionalidade"
        // autocomplete
        select
      >
        <MenuItem key={0} value=""></MenuItem>
        <MenuItem key={1} value={1}>Brasileira</MenuItem>
        <MenuItem key={2} value={2}>Extrangeira</MenuItem>
      </TextField> */}

      <TextField
        className={classes.formFields}
        name="naturalidadeId"
        value={fields.naturalidadeId}
        onChange={handleChange}
        label="Naturalidade"
        select
      >
        <MenuItem value=""><em>Não Informado</em></MenuItem>
        {loadNaturalidades()} {/* 1, 10407, 10211 */}
      </TextField>

      <TextField
        className={classes.formFields}
        name="estadoCivilId"
        value={fields.estadoCivilId}
        onChange={handleChange}
        label="Estado Civil"
        // autocomplete
        select
      >
        {loadEstadosCivis()}
      </TextField>

      <TextField
        className={classes.formFields}
        name="religiaoId"
        value={fields.religiaoId}
        onChange={handleChange}
        label="Religião"
        // autocomplete
        select
      >
        {loadReligioes()}
      </TextField>

      <TextField
        className={classes.formFields}
        name="corPeleId"
        value={fields.corPeleId}
        onChange={handleChange}
        label="Cor da Pele"
        // autocomplete
        select
      >
        {loadCoresPele()}
      </TextField>

      <TextField
        className={classes.formFields}
        name="escolaridadeId"
        value={fields.escolaridadeId}
        onChange={handleChange}
        label="Escolaridade"
        // autocomplete
        select
      >
        {loadEscolaridades()}
      </TextField>

      <TextField
        className={classes.formFields}
        name="profissaoId"
        value={fields.profissaoId}
        onChange={handleChange}
        label="Profissão"
        // autocomplete
        select
      >
        {loadProfissoes()}
      </TextField>

      <TextField
        className={classes.formFields}
        name="situacaoProfissionalId"
        value={fields.situacaoProfissionalId}
        onChange={handleChange}
        label="Situação Profissional"
        // autocomplete
        select
      >
        {loadSituacoesProfissionais()}
      </TextField>
    </div>
  )
}
export default React.forwardRef(PacienteForm)
