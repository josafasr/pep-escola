/**
 * @description Componente para listagem de consultas
 * @module src/pages/ConsultaList
 * @author Josafá Santos dos Reis
 */

import React from 'react';
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import {
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Button,
  LinearProgress
 } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'

import { GET_BY_PACIENTE } from '../graphql/consulta'

const columns = [
  // { id: 'id', label: 'Id', minWidth: 50 },
  { id: 'createdAt', label: 'Data' },
  { id: 'acompanhante', label: 'Acompanhante' },
  { id: 'historiaDoencaAtual', label: 'História Doença Atual' },
  { id: 'queixaPrincipalObs', label: 'Queixa Principal' },
  { id: 'detalhes', label: 'Detalhes' }
];

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
    width: 'auto',
  },

  linkDetail: {
    color: 'gray'
  },

  listItemPaper: {
    marginBottom: '5px'
  },

  listItemInfo: {
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
    margin: 0
  }
}));

export default function PacienteList() {

  const classes = useStyles();

  const { id } = useParams()

  const { loading, error, data } = useQuery(GET_BY_PACIENTE, {
    variables: { pacienteId: id }
  })

  const ptBrDate = (date) => {
    return new Date(parseInt(date)).toLocaleDateString('pt-BR')
  }

  if (loading) return <LinearProgress color="secondary" />
  if (error) return error.message

  return (
    <Paper className={classes.root} elevation={0}>
      <Link to={`/pacientes/${id}/consultas/criar`}>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          color="primary"
        >
          Nova Consulta
        </Button>
      </Link>
      <div>
        <List>
          {data.consultasByPaciente.map(consulta =>
            <Paper className={classes.listItemPaper} key={consulta.id}>
              <ListItem component={Link} to={`/pacientes/${id}/consultas/${consulta.id}`}>
                <ListItemAvatar>
                  <Avatar>
                    <AssignmentIcon />
                  </Avatar>
                </ListItemAvatar>
                <div className={classes.listItemInfo}>
                  <p><b>Data: </b>{ptBrDate(consulta.createdAt)}</p>
                  <div>
                    <p className={classes.column}><b>{consulta.primeira ? 'Primeira consulta' : ''}</b></p>
                    <p className={classes.column}><b>Queixa principal:</b> <span>{consulta.queixaPrincipal?.nome}</span></p>
                  </div>
                </div>
              </ListItem>
            </Paper>
          )}
        </List>
        {/* <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, backgroundColor: 'rgb(223, 223, 223)' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {consultasResponse.data && <TableBody>
              {consultasResponse.data.consultasByPaciente.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{new Date(parseInt(row.createdAt)).toLocaleDateString('pt-br')}</TableCell>
                    <TableCell>{row.acompanhante}</TableCell>
                    <TableCell>{row.historiaDoencaAtual}</TableCell>
                    <TableCell>{row.queixaPrincipalObs}</TableCell>
                    <TableCell>
                      <Link to={`/consultas/${row.id}`} className={classes.linkDetail}>
                        <FileCopyIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>}
          </Table>
        </TableContainer> */}
        {/* {consultasResponse.data && <TablePagination
          labelRowsPerPage="Linhas por página"
          rowsPerPageOptions={[10, 25, 100]}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          component="div"
          count={consultasResponse.data.consultasByPaciente.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />} */}
      </div>
    </Paper>
  );
}
