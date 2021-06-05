/**
 * @title Formulário para controle de antecedentes 
 * patológicos do paciente
 * @module src/forms/AntecedentesPatologicosForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import PacienteContext from '../contexts/PacienteContext'
import { CREATE_PATOLOGIA, TIPOS_PATOLOGIA, PATOLOGIAS } from '../graphql/patologia'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },

  header: {
    backgroundColor: '#ececec'
  },

  items: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: '10px',
    [theme.breakpoints.up(625)]: {
      flexDirection: 'row',
      paddingBottom: 0
    }
  },

  item: {
    width: '100%'
  },

  textField: {
    width: '100%'
  },

  buttomOpenDialog: {
    //width: '100%',
    margin: '0 0 10px 10px',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  }
}))

const AntecedentesPatologicosForm = (props) => {
  const classes = useStyles()
  const { disabled } = props
  const [paciente, setPaciente] = React.useContext(PacienteContext)
  const [tiposPatologia, setTiposPatologia] = React.useState([])
  const [patologias, setPatologias] = React.useState([])
  
  const [open, setOpen] = React.useState(false)
  const [dialog, setDialog] = React.useState({
    nomePatologia: '',
    descricaoPatologia: '',
    tipoPatologia: ''
  })

  useQuery(TIPOS_PATOLOGIA, {
    onCompleted: data => setTiposPatologia(data.tiposPatologia)
  })

  useQuery(PATOLOGIAS, {
    onCompleted: data => setPatologias(data.patologias)
  })

  const [handleCreatePatologia] = useMutation(CREATE_PATOLOGIA)

  const isChecked = patologiaId => {
    if (paciente && paciente.antecedentesPatologicos) {
      return paciente.antecedentesPatologicos.some(item =>
        item.patologia.id === patologiaId
      )
    }
    return false
  }

  const handleChange = event => {
    const { id, checked } = event.target
    let toCheck = []
    if (checked) {
      toCheck = patologias.filter(item => item.id === id)
      setPaciente({
        ...paciente,
        antecedentesPatologicos: paciente.antecedentesPatologicos ? 
        [...paciente.antecedentesPatologicos, { patologia: toCheck[0] }] :
        [{ patologia: toCheck[0] }]
      })
    } else {
      toCheck = paciente.antecedentesPatologicos.filter(item => item.patologia.id !== id)
      setPaciente({
        ...paciente,
        antecedentesPatologicos: toCheck
      })
    }
  }

  const changeText = event => {
    const { id, value } = event.target
    if (id && value) {
      const antecedente = paciente.antecedentesPatologicos.find(item => item.patologia.id === id)
      const antecedentes = paciente.antecedentesPatologicos.filter(item => item.patologia.id !== id)
      setPaciente({
        ...paciente,
        antecedentesPatologicos: paciente.antecedentesPatologicos ? 
          [...antecedentes, { ...antecedente, tempoDiagnostico: value }] :
          [{ ...antecedente, tempoDiagnostico: value }]
      })
    }
  }

/*   React.useEffect(() => {
    if (paciente) {
      console.log(paciente.antecedentesPatologicos)
    }
  }, [paciente]) */

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const dialogChange = event => {
    const { name, value } = event.target
    setDialog({
      ...dialog,
      [name]: value
    })
  }

  const submitDialog = async event => {
    event.preventDefault()
    const patologiaResponse = await handleCreatePatologia({
      variables: {
        nome: dialog.nomePatologia,
        descricao: dialog.descricaoPatologia,
        tipoPatologiaId: dialog.tipoPatologia.id
      }
    })
    const { ok, patologia, errors } = patologiaResponse.data.createPatologia
    if (ok) {
      setPatologias([
        ...patologias,
        {
          ...patologia,
          tipoPatologia: dialog.tipoPatologia
        }
      ])
      handleClose()
    } else {
      alert(`Não foi possível cadastrar! ${errors}`)
    }
  }

  if (tiposPatologia.length < 1) {
    return null
  }

  return (
    <div>
      {tiposPatologia.map(tipo =>
        <Accordion key={tipo.id}>
          <AccordionSummary
            className={classes.header}
            expandIcon={<ExpandMoreIcon />}
            id={`${tipo.id}`}
          >
            {tipo.nome}
          </AccordionSummary>
          <AccordionDetails className={classes.container}>
            {patologias.filter(patologia => patologia.tipoPatologia.id === tipo.id)
              .map(patologia => {
                const antecedentePatologico = paciente.antecedentesPatologicos.find(item => item.patologia.id === patologia.id)
                const { tempoDiagnostico } = antecedentePatologico ? antecedentePatologico : ''
                return <React.Fragment key={patologia.id}>
                  <Grid className={classes.items} container>
                    <Grid className={classes.item} item sm>
                      <FormControlLabel
                        key={patologia.id}
                        control={
                          <Checkbox
                            id={`${patologia.id}`}
                            onChange={handleChange}
                            checked={isChecked(patologia.id)}
                            size="small"
                          />
                        }
                        label={patologia.nome}
                      />
                    </Grid>
                    <Grid className={classes.item} item sm>
                      <TextField
                        className={classes.textField}
                        id={`${patologia.id}`}
                        defaultValue={tempoDiagnostico || ''}
                        onBlur={changeText}
                        label="Há quanto tempo?"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  <Divider />
                </React.Fragment>
              })
            }
          </AccordionDetails>

          <Button
            fullWidth
            className={classes.buttomOpenDialog}
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleClickOpen}>Nova</Button>
        </Accordion>)}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Inserir Nova Patologia</DialogTitle>
          <DialogContent>
            <TextField
              name="nomePatologia"
              defaultValue={dialog.nomePatologia}
              onBlur={dialogChange}
              label="Nome"
              fullWidth
            />

            <TextField
              name="descricaoPatologia"
              defaultValue={dialog.descricaoPatologia}
              onBlur={dialogChange}
              label="Descrição"
              fullWidth
              multiline
            />

            <TextField
              name="tipoPatologia"
              defaultValue={dialog.tipoPatologia}
              onBlur={dialogChange}
              label="Tipo"
              fullWidth
              select
              SelectProps={{
                renderValue: value => value.nome
              }}
            >
              {tiposPatologia.map(tipoPatologia =>
                <MenuItem key={tipoPatologia.id} value={tipoPatologia}>{tipoPatologia.nome}</MenuItem>
              )}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={submitDialog}
            >
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}

export default AntecedentesPatologicosForm