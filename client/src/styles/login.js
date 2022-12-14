/**
 * @title Definição de estilos do formulário de login
 * @module src/styles/login
 * @author Josafá Santos dos Reis
 */
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'url(/images/prontuario-eletronico.png) no-repeat',
    backgroundSize: '100% auto',
    overflowY: 'auto',
    '@media (min-height: 456px)': {
      height: '100vh'
    },
    [theme.breakpoints.down(1062)]: {
      backgroundSize: 'auto 100%'
    },
    [theme.breakpoints.down(460)]: {
      background: 'none'
    }
  },

  overflowRoot: {
    overflow: 'unset'
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 0 0 0',
    width: '100%',
    padding: '20px 0',
    [theme.breakpoints.up(460)]: {
      width: '380px',
      boxShadow: '0px 2px 15px 0px rgba(0,0,0,0.20)',
      borderColor: 'white'
    }
  },

  title: {
    fontSize: 14
  },

  header: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    textAlign: 'center'
  },

  typoTitle: {
    textAlign: 'center',
    color: 'purple'
  },

  cardContent: {
    width: '100%',
    padding: '16px 0'
  },

  media: {
    width: '60px',
    height: '100%'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },

  formCardActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 0
  },

  textField: {
    width: '80%',
    margin: '6px 0'
  },

  error: {
    paddingLeft: '40px',
    marginBottom: '5px',
    fontSize: 'small',
    color: 'red'
  },

  btnLogin: {
    width: '80%',
    marginTop: '5px',
    textTransform: 'none',
    fontSize: 'medium',
    backgroundColor: 'red'
  },
  
  forgetLink: {
    width: '80%',
    marginTop: '10px',
    color: 'royalblue',
    textDecoration: 'none',
    fontSize: 'small'
  },

  copy: {
    textAlign: 'center',
    fontSize: 'small',
    padding: '10px',
    color: 'gray'
  }
}))