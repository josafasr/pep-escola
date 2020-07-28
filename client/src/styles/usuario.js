/**
 * @title Definição de estilos dos componentes de usuários
 * @module src/styles/usuario
 * @author Josafá Santos dos Reis
 */
import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },

  paper: {
    width: '100%'
  },

  form: {
    width: '100%',
  },

  boxFieldset: {
    borderStyle: 'none',
    margin: theme.spacing(2, 0)
  },

  fields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    }
  },

  fieldsContainer: {
    width: '100%'
  },

  formFields: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 0, 0)
    }
  },

  fieldsPessoa: {
    display: 'flex',
    flexWrap: 'wrap'
  },

  grow2: {
    flexGrow: 2
  },

  selectField: {
    minWidth: '210px'
  },

  formButton: {
    /* width: '100%',
    textTransform: 'none',
    color: 'white',
    // backgroundColor: '#f50057',
    margin: theme.spacing(1, 0, 1, 0),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 0, 0),
      width: 'auto'
    } */
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

export default useStyles