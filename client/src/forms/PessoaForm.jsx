/**
 * Formulário para criação/edição dos dados pessoais
 * @module src/forms/PessoaForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import clsx from 'clsx'
import {
  makeStyles,
  Box,
  Typography,
  TextField,
  MenuItem
} from '@material-ui/core'

import { toPtBrDate } from '../utils/format'
import { isEmpty } from '../utils/check'

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
    minWidth: '210px',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 0, 0)
    }
  },

  fieldGrow: {
    flexGrow: 1
  }
}))

function PessoaForm(props, ref) {

  const classes = useStyles()

  const { pessoaData, disabled } = props

  const [fields, setFields] = React.useState({
    nome: pessoaData?.nome || '',
    dataNascimento: toPtBrDate(pessoaData?.dataNascimento) || '',
    sexo: pessoaData?.sexo || ''
  })

  const handleChange = event => {
    event.preventDefault()

    const { name, value } = event.target
    /* setFields(prevValues => ({
      ...prevValues,
      [name]: value
    })) */
    setFields({ ...fields, [name]: value })
  }

  const handleReset = () => {
    setFields({ nome: '', dataNascimento: '', sexo: '' })
  }

  /**
   * Possibilita, ao component pai,
   * acesso a métodos deste component
   */
  React.useImperativeHandle(ref, () => ({
    handleReset: () => {
      handleReset()
    },
    handleChange: () => {
      handleChange()
    }
  }))

  /**
   * Emite aviso de mudança ao component pai
   */
  React.useEffect(() => {
    if (props.onChange) {
      props.onChange(fields)
    }
  })

  // if (!isEmpty(pessoaData)) {
    return (
      <Box className={classes.boxFieldset} component="fieldset">
        {/* <legend>
          <Typography className={classes.boxTitle}>Dados Pessoais</Typography>
        </legend> */}
        <div className={classes.fields}>
          <TextField
            className={clsx(classes.formFields, classes.fieldGrow)}
            name="nome"
            value={fields.nome}
            onChange={handleChange}
            label="Nome"
            size="small"
            inputProps={{
              readOnly: disabled
            }}
          />

          <TextField
            className={classes.formFields}
            name="dataNascimento"
            value={fields.dataNascimento}
            onChange={handleChange}
            label="Data Nascimento"
            placeholder="dd/mm/aaaa"
            size="small"
            inputProps={{
              readOnly: disabled
            }}
          />

          <TextField
            className={classes.formFields}
            name="sexo"
            value={fields.sexo}
            onChange={handleChange}
            label="Sexo"
            size="small"
            select
            inputProps={{
              readOnly: disabled
            }}
          >
            <MenuItem key={0} value=""></MenuItem>
            <MenuItem key={1} value="Feminino">Feminino</MenuItem>
            <MenuItem key={2} value="Masculino">Masculino</MenuItem>
          </TextField>
        </div>
      </Box>
      /* <div>
        <Button
          className={classes.formButton}
          type="submit"
          variant="contained"
          color="primary"
          size="small"
        >Criar</Button>

        <Button
          className={classes.formButton}
          type="reset"
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => setFields({ celular: '', telefone: '', email: '', homePage: '' })}
        >Cancelar</Button>
      </div> */
    )
  // }
}
export default React.forwardRef(PessoaForm)
