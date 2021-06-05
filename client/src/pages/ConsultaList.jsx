/**
 * @title Componente para listagem de consultas
 * @module src/pages/ConsultaList
 * @author Josafá Santos dos Reis
 */

import React from 'react';
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  LinearProgress
 } from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy'

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
  }
}));

export default function PacienteList() {

  const classes = useStyles();

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { id } = useParams()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const consultasResponse = useQuery(GET_BY_PACIENTE, {
    variables: { pacienteId: id }
  })
  if (consultasResponse.loading) return <LinearProgress color="secondary" />
  if (consultasResponse.error) return consultasResponse.error.message

  return (
    <Paper className={classes.root}>
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
      <TableContainer className={classes.container}>
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
              {/* <TableCell>Detalhes</TableCell> */}
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
      </TableContainer>
      {consultasResponse.data && <TablePagination
        labelRowsPerPage="Linhas por página"
        rowsPerPageOptions={[10, 25, 100]}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        component="div"
        count={consultasResponse.data.consultasByPaciente.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />}
      </div>
    </Paper>
  );
}
