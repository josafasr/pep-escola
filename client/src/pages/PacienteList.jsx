  /**
 * @description Componente para listagem de pacientes/prontuários
 * @module src/pages/PacienteList
 * @author Josafá Santos dos Reis
 */

import React from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import {
  makeStyles,
  Paper,
  List,
  ListItem,
  //ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  LinearProgress
 } from '@material-ui/core'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import { GET_ALL } from '../graphql/paciente'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },

  button: {
    textTransform: 'none',
    margin: theme.spacing(1),
    width: 'auto'
  },

  linkDetail: {
    color: 'gray'
  },

  listItem: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    color: '#595959',
    '&& div': {
      display: 'flex',
      flexWrap: 'wrap'
    }
  },

  column: {
    color: 'gray',
    margin: '0 10px 0 0'
  }
}));

export default function PacienteList() {

  const classes = useStyles();

/*   const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }; */

  const pacientesResponse = useQuery(GET_ALL)

  const ptBrDate = (date) => {
    return new Date(`${date}T03:00:00Z`).toLocaleDateString('pt-BR')
  }

  if (pacientesResponse.loading) return <LinearProgress color="secondary" />
  if (pacientesResponse.error) return pacientesResponse.error.message

  return (
    <Paper className={classes.root} elevation={0}>
      <Link to="/pacientes/criar">
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          color="primary"
        >
          Criar Prontuário
        </Button>
      </Link>
      <div>
        <List>
          {pacientesResponse.data.pacientes.map(paciente =>
            <Paper key={paciente.prontuario}>
              <ListItem component={Link} to={`/pacientes/${paciente.id}`}>
                <ListItemAvatar>
                  <Avatar>
                    <AssignmentIndIcon />
                  </Avatar>
                </ListItemAvatar>
                {/* <ListItemText
                  className={classes.listItemText}
                  primary={paciente.pessoa.nome}
                  //secondary={paciente.prontuario}
                /> */}
                <div className={classes.listItem}>
                  <p><b>{paciente.pessoa.nome}</b></p>
                  <div>
                    <p className={classes.column}><b>Prontuário:</b> <span>{paciente.prontuario}</span></p>
                    <p className={classes.column}>
                      <b>Data Nascimento:</b> <span>{ptBrDate(paciente.pessoa.dataNascimento)}</span>
                    </p>
                    <p className={classes.column}><b>Sexo:</b> <span>{paciente.pessoa.sexo}</span></p>
                  </div>
                </div>
              </ListItem>
            </Paper>
          )}
        </List>
      </div>
    </Paper>
  )
}
