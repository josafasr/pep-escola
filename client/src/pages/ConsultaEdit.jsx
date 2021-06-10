/**
 * @title Componente para criação/edição de consultas
 * @module src/pages/ConsultaEdit
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  makeStyles,
  CssBaseline,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  StepButton,
  Paper,
  Button,
  TextField,
  Divider,
  LinearProgress
 } from '@material-ui/core'
 import clsx from 'clsx'
// import PersonIcon from '@material-ui/icons/Person'
// import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
// import HomeIcon from '@material-ui/icons/Home'
// import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'

import { GET_WITH_INCLUDES, CREATE_CONSULTA } from '../graphql/consulta'
import { GET_WITH_INCLUDES as GET_PACIENTE/* , UPDATE_ANTECEDENTES */ } from '../graphql/paciente'
import {
  BULK_CREATE_PACIENTE_ANTECEDENTE_ATRIBUTO/* ,
  BULK_CREATE_COMPLEMENTOS_ANTECEDENTES */
} from '../graphql/antecedente'
import PessoaForm from '../forms/PessoaForm'
import PacienteForm from '../forms/PacienteForm'
import ConsultaForm from '../forms/ConsultaForm'
import PessoaContext from '../contexts/PessoaContext'
import PacienteContext from '../contexts/PacienteContext'
import ConsultaContext from '../contexts/ConsultaContext'
import { toPtBrDate } from '../utils/format'
import InterrogatorioSistematicoForm from '../forms/InterrogatorioSistematicoForm'
import RecordatorioAlimentarForm from '../forms/RecordatorioAlimentarForm'
import IndicadoresExameFisicoForm from '../forms/IndicadoresExameFisicoForm'
import ExameFisicoForm from '../forms/ExameFisicoForm'
import DiagnosticoForm from '../forms/DiagnosticoForm'
import ResponsavelConsultaForm from '../forms/ResponsavelConsultaForm'
// import AntecedentesPatologicosForm from '../forms/AntecedentesPatologicosForm'
import AntecedentesForm from '../forms/AntecedentesForm'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },

  header: {
    marginTop: 0
  },

  stepper: {
    padding: 0
  },

  boxTitle: {
    fontWeight: 'bold'
  },

  paper: {
    width: '100%',
    marginBottom: '10px',
    padding: theme.spacing(1) // top, right, bottom, left
  },

  stepButton: {
    width: 'auto'
  },

  stepLabel: {
    color: 'blue'
  },

  stepContent: {
    paddingLeft: '8px',
    paddingRight: 0
  },

  buttons: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'row'
    }
  },

  button: {
    width: '100%',
    boxShadow: `0px 3px 1px -2px rgba(0,0,0,0.2),
      0px 2px 2px 0px rgba(0,0,0,0.14),
      0px 1px 5px 0px rgba(0,0,0,0.12)`,
    textTransform: 'none',
    marginBottom: '10px',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      marginRight: '10px'
    }
  },

  fields: {
    margin: theme.spacing(1, 0),
    minWidth: '240px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 0, 0)
    }
  },

  fieldGrow: {
    flexGrow: 1
  },

  final: {
    margin: '20px 0 0 20px'
  }
}))

function ConsultaEdit() {

  const classes = useStyles()

  const { id } = useParams()
  let pacienteId

  const history = useHistory()

  const { url } = useRouteMatch()

  if (url.indexOf('criar') !== -1) {
    pacienteId = id
  }
 
  const [pessoa, setPessoa] = React.useState({})
  //const [contato, setContato] = React.useState({})
  //const [endereco, setEndereco] = React.useState({})
  const [paciente, setPaciente] = React.useState()
  const [consulta, setConsulta] = React.useState({})
  const [activeStep, setActiveStep] = React.useState(0)

  const pessoaRef = React.useRef()
  const pacienteRef = React.useRef()
  //const contatoRef = React.useRef()
  //const enderecoRef = React.useRef()
  const consultaRef = React.useRef()

  const [handleCreateConsulta] = useMutation(CREATE_CONSULTA)
  const [handleCreateAntecedentes] = useMutation(BULK_CREATE_PACIENTE_ANTECEDENTE_ATRIBUTO)
  //const [handleCreateComplementosAntecedentes] = useMutation(BULK_CREATE_COMPLEMENTOS_ANTECEDENTES)

  /* const pacienteData =  */useQuery(GET_PACIENTE, {
    variables: { id: pacienteId },
    onCompleted: (data) => {
      setPessoa({
        ...data.paciente.pessoa,
        dataNascimento: toPtBrDate(data.paciente.pessoa.dataNascimento)
        // dataNascimento: new Date(`${data.paciente.pessoa.dataNascimento}T03:00:00Z`).toLocaleString("pt-BR", {dateStyle: "short"})
      })
      setPaciente(data.paciente)
    },
    skip: !pacienteId
  })

  const { loading } = useQuery(GET_WITH_INCLUDES, {
    variables: { id },
    onCompleted: (data) => {
      setPessoa({
        ...data.consulta.paciente.pessoa,
        dataNascimento: toPtBrDate(data.consulta.paciente.pessoa.dataNascimento)
      })
      setPaciente(data.consulta.paciente)
      setConsulta(data.consulta)
    },
    skip: !!pacienteId
  })

  /* const bindConsulta = (toBind) => {
    const queixaPrincipalId = parseInt(toBind.queixaPrincipal.id)
    const queixasIds = toBind.queixas.map(queixa => parseInt(queixa.id))

    return { queixaPrincipalId, queixasIds }
  } */

  const handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    const queixas = consulta.queixas?.map(queixa => parseInt(queixa.id))

    const recordatorioAlimentar = consulta.recordatorioAlimentar?.map(recordatorio => {
      const { alimento, tipoRefeicao } = recordatorio
      delete tipoRefeicao['__typename']
      if (alimento.__typename) {
        delete alimento['__typename']
      }

      return {
        ...recordatorio,
        alimento,
        tipoRefeicao
      }
    })

    const exameFisico = consulta.exameFisico?.map(exame => parseInt(exame.id))

    /* const pacienteResponse = await handleUpdateAntecedentes({
      variables: {
        id: pacienteId,
        antecedentesPatologicos: consulta.paciente?.antecedentesPatologicos
      }
    })

    const { ok, paciente, errors } = pacienteResponse.data.updatePaciente

    if (ok) {
      alert('Antecedentes atualizados com sucesso!')
    } else {
      alert(`Não foi possível atualizar os antecedentes :( ${errors}`)
    } */

    const pacienteAntecedenteAtributos = paciente.antecedentesAtributos.map(item => {
      return {
        atributoValor: item.atributoValor,
        pacienteId: parseInt(paciente.id),
        antecedenteId: parseInt(item.antecedente.id),
        antecedenteAtributoId: parseInt(item.antecedenteAtributo.id)
      }
    })

    const complementosAntecedentes = consulta.complementosAntecedentes.map(item => {
      return {
        complemento: item.complemento,
        //pacienteId: parseInt(paciente.id),
        tipoAntecedenteId: parseInt(item.tipoAntecedente.id)
      }
    })

    const pacienteAntecedenteAtributosResponse = await handleCreateAntecedentes({
      variables: { pacienteAntecedenteAtributos }
    })

    /* const complementosAntecedentesResponse = await handleCreateComplementosAntecedentes({
      variables: { complementosAntecedentes }
    }) */

    const createPacienteAntecedentesAtributos = pacienteAntecedenteAtributosResponse.data.bulkCreatePacienteAntecedenteAtributo

    //const createComplementosAntecedentes = complementosAntecedentesResponse.data.bulkCreateComplementosAntecedentes

    if (createPacienteAntecedentesAtributos.ok) {
      const consultaResponse = await handleCreateConsulta({
        variables: {
          pacienteId: parseInt(pacienteId),
          acompanhante: consulta.acompanhante,
          queixaPrincipalObs: consulta.queixaPrincipalObs,
          historiaDoencaAtual: consulta.historiaDoencaAtual,
          queixaPrincipalId: parseInt(consulta.queixaPrincipal?.id),
          queixas, //: consulta.queixas.map(queixa => parseInt(queixa.id)),
          complementosQueixas: consulta.complementosQueixas,
          recordatorioAlimentar,
          indicadoresExameFisico: consulta.indicadoresExameFisico,
          exameFisico, //: consulta.exameFisico,
          complementosAntecedentes,
          suspeitasDiagnosticas: consulta.suspeitasDiagnosticas,
          planoConduta: consulta.planoConduta
        }
      })
  
      if (consultaResponse.data.createConsulta.ok) {
        alert('Consulta criada com sucesso!')
        handleGoBack()
      } else {
        alert('Não foi possível criar a consulta :(')
      }
    }
  }

  const handleGoBack = () => {
    history.goBack()
  }

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const handleChange = event => {
    setConsulta({
      ...consulta,
      acompanhante: event.target.value
    })
  }
/* 
  const handleResetSteps = () => {
    setActiveStep(0)
    handleGoBack()
  }
 */

  const buttons = (
    <div>
      <Button
        disabled={activeStep === 0}
        variant="contained"
        color="primary"
        onClick={handleBack}
        className={classes.button}
        size="small"
      >
        Voltar
      </Button>
      <Button
        disabled={activeStep === 6}
        variant="contained"
        color="primary"
        onClick={handleNext}
        className={classes.button}
        size="small"
      >
        Avançar
      </Button>
    </div>
  )

  if (loading) return <LinearProgress color="secondary" />

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ConsultaContext.Provider value={[consulta, setConsulta]}>
        <Paper className={classes.paper} elevation={2}>
          <h2 className={classes.header}>
            {!!pacienteId ? 
            'Nova Consulta' : 
            `Consulta realizada em ${new Date(parseInt(consulta?.createdAt))
              .toLocaleString("pt-BR", { dateStyle: "short" })}`}
          </h2>
          <PessoaContext.Provider value={{pessoa, setPessoa}}>
            <PessoaForm
              ref={pessoaRef}
              disabled={!pacienteId}
            />
          </PessoaContext.Provider>

          <PacienteContext.Provider value={[paciente, setPaciente]}>
            <PacienteForm
              ref={pacienteRef}
              disabled={!pacienteId}
            />
          </PacienteContext.Provider>

          <TextField
            className={clsx(classes.fields, classes.fieldGrow)}
            name="acompanhante"
            value={consulta.acompanhante || ''}
            onChange={handleChange}
            label="Acompanhante"
            inputProps={{
              readOnly: !pacienteId
            }}
          />
        </Paper>

        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          classes={{ root: classes.stepper }}
        >
          {/* <Step disabled={false}>
            <StepButton className={classes.stepButton} onClick={handleStep(0)}>
              <StepLabel className={classes.stepLabel}>Dados Pessoais</StepLabel>
            </StepButton>
            <StepContent classes={{ root: classes.stepContent }}>
              <Paper className={classes.paper} elevation={2}>
                <PacienteContext.Provider value={[paciente, setPaciente]}>
                  <PacienteForm
                    ref={pacienteRef}
                    disabled={!pacienteId}
                  />
                </PacienteContext.Provider>
              </Paper>
              {buttons}
            </StepContent>
          </Step> */}

          <Step disabled={false}>
            <StepButton className={classes.stepButton} onClick={handleStep(0)}>
              <StepLabel className={classes.stepLabel}>Alunos</StepLabel>
            </StepButton>
            <StepContent classes={{ root: classes.stepContent }}>
              <Paper className={classes.paper} elevation={2}>
                <ResponsavelConsultaForm />
              </Paper>
              {buttons}
            </StepContent>
          </Step>
          
          <Step disabled={false}>
            <StepButton className={classes.stepButton} onClick={handleStep(1)}>
              <StepLabel className={classes.stepLabel}>Anamnese</StepLabel>
            </StepButton>
            <StepContent classes={{ root: classes.stepContent }}>
              <Paper className={classes.paper} elevation={2}>
                <ConsultaForm
                  ref={consultaRef}
                  disabled={!pacienteId}
                  />
              </Paper>
              {buttons}
            </StepContent>
          </Step>

          <Step disabled={false}>
            <StepButton className={classes.stepButton} onClick={handleStep(2)}>
              <StepLabel className={classes.stepLabel}>Interrogatório Sistemático</StepLabel>
            </StepButton>

            <StepContent classes={{ root: classes.stepContent }}>
              <Paper className={classes.paper} elevation={2}>
                <InterrogatorioSistematicoForm />
              </Paper>
              {buttons}
            </StepContent>
          </Step>

          <Step disabled={false}>
            <StepButton className={classes.stepButton} onClick={handleStep(3)}>
              <StepLabel className={classes.stepLabel}>Recordatório Alimentar</StepLabel>
            </StepButton>
            <StepContent classes={{ root: classes.stepContent }}>
              <Paper className={classes.paper} elevation={2}>
                <RecordatorioAlimentarForm />
              </Paper>
              {buttons}
            </StepContent>
          </Step>

          <Step disabled={false}>
            <StepButton className={classes.stepButton} onClick={handleStep(4)}>
              <StepLabel className={classes.stepLabel}>Antecedentes Médicos Patológicos</StepLabel>
            </StepButton>
            <StepContent classes={{ root: classes.stepContent }}>
              <Paper className={classes.paper} elevation={2}>
                <PacienteContext.Provider value={[paciente, setPaciente]}>
                  {/* <AntecedentesPatologicosForm /> */}
                  <AntecedentesForm />
                </PacienteContext.Provider>
              </Paper>
              {buttons}
            </StepContent>
          </Step>

          <Step disabled={false}>
            <StepButton className={classes.stepButton} onClick={handleStep(5)}>
              <StepLabel className={classes.stepLabel}>Exame Físico</StepLabel>
            </StepButton>
            <StepContent classes={{ root: classes.stepContent }}>
              <Paper className={classes.paper} elevation={2}>
                <IndicadoresExameFisicoForm
                  disabled={!pacienteId}
                />
                <ExameFisicoForm />
              </Paper>
              {buttons}
            </StepContent>
          </Step>

          <Step disabled={false}>
            <StepButton className={classes.stepButton} onClick={handleStep(6)}>
              <StepLabel className={classes.stepLabel}>Diagnóstico</StepLabel>
            </StepButton>
            <StepContent classes={{ root: classes.stepContent }}>
              <Paper className={classes.paper} elevation={2}>
                <DiagnosticoForm
                  disabled={!pacienteId}
                />
              </Paper>
              {buttons}
            </StepContent>
          </Step>
        </Stepper>
      </ConsultaContext.Provider>
      <Divider />
      <div className={classes.final}>
        <Button
          //disabled={activeStep === 0}
          onClick={handleGoBack}
          className={classes.button}
          size="small"
        >
          Cancelar
        </Button>
        <Button
          //disabled={activeStep === 5 && !pacienteId}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.button}
          size="small"
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
export default ConsultaEdit
