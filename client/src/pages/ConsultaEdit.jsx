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
  Button
 } from '@material-ui/core'
// import PersonIcon from '@material-ui/icons/Person'
// import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
// import HomeIcon from '@material-ui/icons/Home'
// import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'

import { GET_WITH_INCLUDES, CREATE_CONSULTA } from '../graphql/consulta'
import { GET_WITH_INCLUDES as GET_PACIENTE } from '../graphql/paciente'
import PessoaForm from '../forms/PessoaForm'
//import PacienteForm from '../forms/PacienteForm'
import ConsultaForm from '../forms/ConsultaForm'
import PessoaContext from '../contexts/PessoaContext'
//import PacienteContext from '../contexts/PacienteContext'
import ConsultaContext from '../contexts/ConsultaContext'
import { toPtBrDate } from '../utils/format'
import InterrogatorioSistematicoForm from '../forms/InterrogatorioSistematicoForm'
import RecordatorioAlimentarForm from '../forms/RecordatorioAlimentarForm'
import DiagnosticoForm from '../forms/DiagnosticoForm'

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
  //const pacienteRef = React.useRef()
  //const contatoRef = React.useRef()
  //const enderecoRef = React.useRef()
  const consultaRef = React.useRef()

  const [handleCreateConsulta] = useMutation(CREATE_CONSULTA)

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

    /* const bindedFields = bindConsulta(consulta)
    console.log(bindedFields); */

    const recordatorioAlimentar = consulta.recordatorioAlimentar.map(recordatorio => {
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

    const consultaResponse = await handleCreateConsulta({
      variables: {
        pacienteId: parseInt(pacienteId),
        acompanhante: consulta.acompanhante,
        queixaPrincipalObs: consulta.queixaPrincipalObs,
        historiaDoencaAtual: consulta.historiaDoencaAtual,
        queixaPrincipalId: parseInt(consulta.queixaPrincipal.id),
        queixas: consulta.queixas.map(queixa => parseInt(queixa.id)),
        recordatorioAlimentar, //: consulta.recordatorioAlimentar
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
/* 
  const handleResetSteps = () => {
    setActiveStep(0)
    handleGoBack()
  }
 */

  const buttons = (
    <div>
      <Button
        //disabled={activeStep === 0}
        onClick={activeStep === 0 ? handleGoBack : handleBack}
        className={classes.button}
        size="small"
      >
        Voltar
      </Button>
      <Button
        disabled={activeStep === 3 && !pacienteId}
        variant="contained"
        color="primary"
        onClick={activeStep === 3 ? handleSubmit : handleNext}
        className={classes.button}
        size="small"
      >
        {activeStep === 3 ? 'Salvar' : 'Avançar'}
      </Button>
    </div>
  )

  if (loading) return 'Carregando...'

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ConsultaContext.Provider value={[consulta, setConsulta]}>
        <Paper className={classes.paper} elevation={2}>
          <h2 className={classes.header}>Nova Consulta</h2>
          <PessoaContext.Provider value={{pessoa, setPessoa}}>
            <PessoaForm
              ref={pessoaRef}
              disabled={!pacienteId}
            />
          </PessoaContext.Provider>
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
            <StepButton className={classes.stepButton} onClick={handleStep(1)}>
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
            <StepButton className={classes.stepButton} onClick={handleStep(2)}>
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
            <StepButton className={classes.stepButton} onClick={handleStep(3)}>
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
    </div>
  )
}
export default ConsultaEdit
