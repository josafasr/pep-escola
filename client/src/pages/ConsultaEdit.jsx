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
  Box,
  Button
 } from '@material-ui/core'
// import PersonIcon from '@material-ui/icons/Person'
// import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
// import HomeIcon from '@material-ui/icons/Home'
// import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'

import { GET_WITH_INCLUDES as GET_PACIENTE } from '../graphql/paciente'
import { GET_WITH_INCLUDES, CREATE_CONSULTA } from '../graphql/consulta'
import PessoaForm from '../forms/PessoaForm'
import PacienteForm from '../forms/PacienteForm'
import ConsultaForm from '../forms/ConsultaForm'
import QueixaContext from '../contexts/QueixaContext'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },

  stepper: {
    padding: 0
  },

  box: {
    borderStyle: 'none',
    padding: theme.spacing(1, 2, 2, 2) // top, right, bottom, left
  },

  boxTitle: {
    fontWeight: 'bold'
  },

  paper: {
    width: '100%',
    marginBottom: '10px'
  },

  stepButton: {
    width: 'auto'
  },

  stepLabel: {
    color: 'blue'
  },

  stepContent: {
    paddingLeft: '8px'
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
 
  //const [pessoa, setPessoa] = React.useState({})
  //const [contato, setContato] = React.useState({})
  //const [endereco, setEndereco] = React.useState({})
  const [paciente, setPaciente] = React.useState({})
  const [consulta, setConsulta] = React.useState({})
  const [activeStep, setActiveStep] = React.useState(0)
  const [queixa, setQueixa] = React.useState({})

  const pessoaRef = React.useRef()
  const pacienteRef = React.useRef()
  //const contatoRef = React.useRef()
  //const enderecoRef = React.useRef()
  const consultaRef = React.useRef()

  const [handleCreateConsulta] = useMutation(CREATE_CONSULTA, {
    variables: {
      ...consulta,
      queixaPrincipalId: parseInt(queixa.id),
      queixas: [parseInt(queixa.id)],
      pacienteId
    }
  })

  const pacienteData = useQuery(GET_PACIENTE, {
    variables: { id: pacienteId },
      onCompleted: (data) => {
      //setPessoa(data.paciente.pessoa)
      setPaciente(data.paciente)
    },
    skip: !pacienteId,
    notifyOnNetworkStatusChange: true,
  })

  const consultaData = useQuery(GET_WITH_INCLUDES, {
    variables: { id },
    skip: !!pacienteId
  })
/*
  const handleChangePessoa = data => {
    if (!isEmpty(data)) {
      setPessoa(data)
    }
  }

  const handleChangeContato = data => {
    if (!isEmpty(data)) {
      setContato(data)
    }
  }

  const handleChangeEndereco = data => {
    if (!isEmpty(data)) {
      setEndereco(data)
    }
  }
 */
  const handleChangePaciente = pacienteField => {
    const { name, value } = pacienteField
    setPaciente({
      ...paciente,
      [name]: value
    })
  }

  const handleChangeConsulta = consultaField => {
    const { name, value } = consultaField
    setConsulta({
      ...consulta,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    const consultaResponse = await handleCreateConsulta()

    if (consultaResponse.data.createConsulta.ok) {
      alert('Consulta criada com sucesso!')
      handleResetForms()
    } else {
      alert('Não foi possível criar a consulta :(')
    }
  }
/* 
  const handleReset = () => {
    pessoaRef.current.handleReset()
    pacienteRef.current.handleReset()
    contatoRef.current.handleReset()
    enderecoRef.current.handleReset()
    consultaRef.current.handleReset()
  }
*/
  const handleResetForms = () => {
    //setPessoa({})
    setPaciente({})
    //setContato({})
    //setEndereco({})
    setConsulta({})
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
    handleResetForms()
  }
 */

  const buttons = (
    <div>
      <Button
        //disabled={activeStep === 0}
        onClick={activeStep === 0 ? handleResetForms : handleBack}
        className={classes.button}
      >
        Voltar
      </Button>
      <Button
        disabled={activeStep === 1 && !pacienteId}
        variant="contained"
        color="primary"
        onClick={activeStep === 1 ? handleSubmit : handleNext}
        className={classes.button}
      >
        {activeStep === 1 ? 'Salvar' : 'Avançar'}
      </Button>
    </div>
  )

  if (pacienteData.loading || consultaData.loading) return 'Carregando...'

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Paper className={classes.paper} elevation={2}>
        <PessoaForm
          pessoaData={consultaData.data?.consulta.paciente.pessoa || pacienteData.data?.paciente.pessoa}
          //onChange={handleChangePessoa}
          ref={pessoaRef}
          disabled={false}
        />
      </Paper>

      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        classes={{ root: classes.stepper }}
      >
        <Step disabled={false}>
          <StepButton className={classes.stepButton} onClick={handleStep(0)}>
            <StepLabel className={classes.stepLabel}>Dados Pessoais</StepLabel>
          </StepButton>
          <StepContent classes={{ root: classes.stepContent }}>
            <Paper className={classes.paper} elevation={2}>
              <PacienteForm
                pacienteData={consultaData?.data?.consulta?.paciente || paciente}
                onChange={handleChangePaciente}
                ref={pacienteRef}
                // disabled={false}
              />
            </Paper>
            {/* {buttons} */}
          </StepContent>
        </Step>

        <Step disabled={false}>
          <StepButton className={classes.stepButton} onClick={handleStep(1)}>
            <StepLabel className={classes.stepLabel}>Anamnese</StepLabel>
          </StepButton>
          <StepContent classes={{ root: classes.stepContent }}>
            <Paper className={classes.paper} elevation={2}>
              <Box className={classes.box} componente="fieldset">
                <QueixaContext.Provider value={{queixa, setQueixa}}>
                  <ConsultaForm
                    consultaData={consultaData?.data?.consulta || consulta}
                    onChange={handleChangeConsulta}
                    ref={consultaRef}
                  />
                </QueixaContext.Provider>
              </Box>
            </Paper>
            {/* {buttons} */}
          </StepContent>
        </Step>
      </Stepper>
      {buttons}
    </div>
  )
}
export default ConsultaEdit
