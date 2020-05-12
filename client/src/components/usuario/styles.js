import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },

  paper: {
    width: '100%'
  },

  form: {
    width: '100%',
    // padding: theme.spacing(2)
  },

  boxFieldset: {
    borderStyle: 'none',
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
    width: '100%',
    textTransform: 'none',
    color: 'white',
    // backgroundColor: '#f50057',
    margin: theme.spacing(1, 0, 1, 0),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 0, 0),
      width: 'auto'
    }
  }
}))

export default useStyles