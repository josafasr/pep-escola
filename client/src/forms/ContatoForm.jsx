/**
 * Formulário para criação/edição dos dados de contatos
 * @module src/forms/ContatoForm
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import {
  makeStyles,
  Box,
  TextField
} from '@material-ui/core'

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

  formButton: {
    width: '100%',
    textTransform: 'none',
    color: 'white',
    margin: theme.spacing(1, 0, 1, 0),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 0, 0),
      width: 'auto'
    }
  }
}))

function ContatoForm(props, ref) {

  const { contatoData, disabled } = props

  const classes = useStyles()

  const [fields, setFields] = React.useState({
    celular: contatoData?.celular || '',
    telefone: contatoData?.telefone || '',
    email: contatoData?.email || '',
    homePage: contatoData?.homePage || ''
  })

  const handleChange = event => {
    event.preventDefault()
    event.stopPropagation()
    const { name, value } = event.target

    setFields({ ...fields, [name]: value })
  }

  const handleReset = () => {
    setFields({ celular: '', telefone: '', email: '', homePage: '' })
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

  /**
   * Emite aviso de mudança ao component pai
   */
  React.useEffect(() => {
    if (props.onChange) {
      props.onChange(fields)
    }
  })

  return (
    <Box className={classes.boxFieldset} component="fieldset">
      <div className={classes.fields}>
        <TextField
          className={classes.formFields}
          name="celular"
          value={fields.celular}
          onChange={handleChange}
          label="Celular"
          size="small"
          inputProps={{
            readOnly: disabled
          }}
        />

        <TextField
          className={classes.formFields}
          name="telefone"
          value={fields.telefone}
          onChange={handleChange}
          label="Telefone"
          size="small"
          inputProps={{
            readOnly: disabled
          }}
        />

        <TextField
          className={classes.formFields}
          type="email"
          name="email"
          value={fields.email}
          onChange={handleChange}
          label="E-mail"
          size="small"
          inputProps={{
            readOnly: disabled
          }}
        />

        <TextField
          className={classes.formFields}
          name="homePage"
          value={fields.homePage}
          onChange={handleChange}
          label="Home Page"
          size="small"
          inputProps={{
            readOnly: disabled
          }}
        />
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
}
export default React.forwardRef(ContatoForm)