/**
 * @description Formulário para controle de antecedentes
 * @module src/forms/AntecedentesForm
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
  LinearProgress,
  MenuItem
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import PacienteContext from '../contexts/PacienteContext'
import ConsultaContext from '../contexts/ConsultaContext'
import { TIPOS_ANTECEDENTE_WITH_ASSOCIATIONS, CREATE_ANTECEDENTE } from '../graphql/antecedente'
//import { useTiposAntecedente } from '../hooks/useTiposAntecedentes'

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
    width: '100%',
    margin: '0 5px'
  },

  textField: {
    width: '100%'
  },

  textArea: {
    marginTop: '10px'
  },

  buttomOpenDialog: {
    width: '100%',
    margin: '0 0 10px 10px',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  }
}))

const AntecedentesForm = (props) => {
  const classes = useStyles()
  const { disabled } = props
  const [paciente, setPaciente] = React.useContext(PacienteContext)
  const [consulta, setConsulta] = React.useContext(ConsultaContext)
  const [tiposAntecedente, setTiposAntecedente] = React.useState([])
  const [antecedentes, setAntecedentes] = React.useState([])
  
  const [open, setOpen] = React.useState(false)
  const [dialog, setDialog] = React.useState({
    nomeAntecedente: '',
    descricaoAntecedente: '',
    tipoAntecedente: ''
  })

  //const tiposAntecedenteData = useTiposAntecedente()

  useQuery(TIPOS_ANTECEDENTE_WITH_ASSOCIATIONS, {
    onCompleted: data => {
      setTiposAntecedente(data.tiposAntecedenteWithAssociations)
      const antecedenteArrays = data.tiposAntecedenteWithAssociations.map(tipoAntecedente => {
        return [].concat(tipoAntecedente.antecedentes)
      })
      const antecedenteArray = [].concat(...antecedenteArrays)
      setAntecedentes(antecedenteArray)
    }
  })

  const [handleCreateAntecedente] = useMutation(CREATE_ANTECEDENTE)

  /* React.useEffect(() => {
    if (tiposAntecedenteData) {
      setTiposAntecedente(tiposAntecedenteData.tipos)
      const antecedenteArrays = tiposAntecedenteData.tipos.map(tipoAntecedente => {
        return [].concat(tipoAntecedente.antecedentes)
      })
      const antecedenteArray = [].concat(...antecedenteArrays)
      setAntecedentes(antecedenteArray)
    }
  }) */

  const handleChange = event => {
    const { id, checked } = event.target
    let toCheck = []
    if (checked) {
      toCheck = antecedentes?.filter(item => item.id === parseInt(id))
      setPaciente({
        ...paciente,
        antecedentesAtributos: paciente.antecedentesAtributos
        ? [
            ...paciente.antecedentesAtributos,
            {
              antecedente: toCheck[0]
            }
          ]
        : [{ antecedente: toCheck[0] }]
      })
    } else {
      toCheck = paciente.antecedentesAtributos.filter(item => item.antecedente?.id !== parseInt(id))
      setPaciente({
        ...paciente,
        antecedentesAtributos: toCheck
      })
    }
  }

  const isChecked = antecedenteId => {
    if (paciente && paciente.antecedentesAtributos) {
      return paciente.antecedentesAtributos.some(item => item.antecedente?.id === antecedenteId)
    }
    return false
  }


  const changeText = event => {
    const { id, value } = event.target
    if (id && value) {
      const antecedenteId = parseInt(id.split('-')[1])
      const atributoId = parseInt(id.split('-')[3])

      let atributo, atributos
      atributo = paciente.antecedentesAtributos.find(item =>
        item.antecedente?.id === antecedenteId && item.antecedenteAtributo?.id === atributoId
      )

      if (atributo) {
        if (atributo.id) {
          atributos = paciente.antecedentesAtributos.filter(item => item.id !== atributo?.id
          )
        } else if (atributo.antecedenteAtributo) {
          atributos = paciente.antecedentesAtributos.filter(item =>
            item.antecedente.id !== antecedenteId || item.antecedenteAtributo.id !== atributoId
          )
        }
      } else {
        const hasEmptyAntecedente = paciente.antecedentesAtributos.some(item => item.antecedenteAtributo === undefined)
        if (hasEmptyAntecedente) {
          atributo = paciente.antecedentesAtributos.find(item => item.antecedenteAtributo === undefined)
          atributos = paciente.antecedentesAtributos.filter(item => item.antecedenteAtributo !== undefined)
        } else {
          atributos = paciente.antecedentesAtributos
        }
      }

      setPaciente({
        ...paciente,
        antecedentesAtributos: [
          ...atributos,
          atributo
          ? // valor de atributo existente
            atributo.antecedenteAtributo
            ? // atributo existente
              {
                ...atributo,
                atributoValor: value
              }
            : // atributo existente
              {
                atributoValor: value,
                antecedenteAtributo: {
                  id: atributoId
                },
                antecedente: {
                  id: antecedenteId
                }
              }
          : // valor de atributo inexistente
            {
              atributoValor: value,
              antecedenteAtributo: {
                id: atributoId
              },
              antecedente: {
                id: antecedenteId
              }
            }
          ]
      })
    }
  }

  const changeComplemento = event => {
    const { id, value } = event.target
    if (id && value) {
      const tipoId = parseInt(id)
      const complemento = consulta.complementosAntecedentes?.find(item => item.id === tipoId)
      const complementos = consulta.complementosAntecedentes?.filter(item => item.id !== tipoId)
      setConsulta({
        ...consulta,
        complementosAntecedentes:
          complementos
          ? [
              ...complementos,
              complemento
              ? {
                  ...complemento,
                  complemento: value
                }
                
              : {
                  tipoAntecedente: { id: tipoId },
                  complemento: value
                }
            ]
          : complemento
            ? [{
                ...complemento,
                complemento: value
              }]
            : [{
                tipoAntecedente: { id: tipoId },
                complemento: value
              }]
      })
    }
  }

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
    const antecedenteResponse = await handleCreateAntecedente({
      variables: {
        nome: dialog.nomeAntecedente,
        descricao: dialog.descricaoAntecedente,
        tipoAntecedenteId: parseInt(dialog.tipoAntecedente.id)
      }
    })

    const { ok, antecedente, errors } = antecedenteResponse.data.createAntecedente
    if (ok) {
      const tipo = tiposAntecedente.find(item => item.id === dialog.tipoAntecedente.id)
      const otherTipos = tiposAntecedente.filter(item => item.id !== dialog.tipoAntecedente.id)
      const otherAntecedentes = tipo.antecedentes.filter(item => item.id !== antecedente.id)
      setTiposAntecedente([
        ...otherTipos,
        {
          ...tipo,
          antecedentes: [
            ...otherAntecedentes,
            antecedente
          ]
        }
      ])
      setAntecedentes([
        ...antecedentes,
        antecedente
      ])
      handleClose()
    } else {
      alert(`Não foi possível cadastrar! ${errors}`)
    }
  }

  if (tiposAntecedente.length < 1) {
    return <LinearProgress color="secondary" />
  }

  return (
    <div>
      {tiposAntecedente.map(tipo => {
        const readOnly = !!consulta.id
        const complementoAntecedente = consulta.complementosAntecedentes?.find(item =>
          item.tipoAntecedente?.id === tipo.id
        )
        return <Accordion key={tipo.id}>
          <AccordionSummary
            className={classes.header}
            expandIcon={<ExpandMoreIcon />}
            id={`${tipo.id}`}
          >
            {tipo.nome}
          </AccordionSummary>

          <AccordionDetails className={classes.container}>
            {tipo.antecedentes.map(antecedente => {
              return <React.Fragment key={antecedente.id}>
                <Grid className={classes.items} container>
                  <Grid className={classes.item} item sm>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={`${antecedente.id}`}
                          onChange={!readOnly ? handleChange : undefined}
                          checked={isChecked(antecedente.id)}
                          size="small"
                          readOnly={readOnly}
                        />
                      }
                      label={antecedente.nome}
                    />
                  </Grid>

                  {tipo.atributos.map(atributo => {
                    const antecedenteAtributo = paciente.antecedentesAtributos?.find(item =>
                      item.antecedente?.id === parseInt(antecedente.id)
                      && item.antecedenteAtributo?.id === parseInt(atributo.id)
                    )
                    return <Grid key={atributo.id} className={classes.item} item sm>
                      <TextField
                        className={classes.textField}
                        id={`antecedente-${antecedente.id}-atributo-${atributo.id}`}
                        defaultValue={isChecked(antecedente.id) ? antecedenteAtributo?.atributoValor : ''}
                        onBlur={changeText}
                        label={atributo.nome}
                        size="small"
                        InputProps={{
                          disabled: (!isChecked(antecedente.id) || readOnly)
                        }}
                      />
                    </Grid>
                  })}
                </Grid>
                <Divider />
              </React.Fragment>
            })}

            <TextField
              className={classes.textArea}
              id={`${tipo.id}`}
              defaultValue={complementoAntecedente?.complemento || ''}
              onBlur={changeComplemento}
              multiline
              label="Complemento"
              variant="filled"
              inputProps={{
                readOnly: !!consulta.id
              }}
            />
          </AccordionDetails>

          <Button
            className={classes.buttomOpenDialog}
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleClickOpen}
          >
            Novo Item
          </Button>
        </Accordion>
      })}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Inserir Novo Item</DialogTitle>
        <DialogContent>
          <TextField
            name="nomeAntecedente"
            defaultValue={dialog.nomeAntecedente}
            onBlur={dialogChange}
            label="Nome"
            fullWidth
          />

          <TextField
            name="descricaoAntecedente"
            defaultValue={dialog.descricaoAntecedente}
            onBlur={dialogChange}
            label="Descrição"
            fullWidth
            multiline
          />

          <TextField
            name="tipoAntecedente"
            defaultValue={dialog.tipoAntecedente}
            onBlur={dialogChange}
            label="Tipo"
            fullWidth
            select
            SelectProps={{
              renderValue: value => value.nome
            }}
          >
            {tiposAntecedente.map(tipoAntecedente =>
              <MenuItem
                key={tipoAntecedente.id}
                value={tipoAntecedente}
              >
                {tipoAntecedente.nome}
              </MenuItem>
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

export default AntecedentesForm