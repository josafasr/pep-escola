/**
 * @title Componente para listagem de pacientes/prontuários
 * @module src/pages/PacienteList
 * @author Josafá Santos dos Reis
 */

import React from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import {
  makeStyles,
  Paper,
  // Tabs,
  // Tab,
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

import { toPtBrDate } from '../utils/format'
import { GET_ALL } from '../graphql/paciente'

const columns = [
  // { id: 'id', label: 'Id', minWidth: 50 },
  { id: 'prontuario', label: 'Prontuário' },
  { id: 'nome', label: 'Paciente' },
  { id: 'dataNascimento', label: 'Nasimento' },
  { id: 'sexo', label: 'Sexo' },
  { id: 'rg', label: 'RG' },
  { id: 'cpf', label: 'CPF' },
  { id: 'cns', label: 'CNS' },
  { id: 'detalhes', label: 'Detalhes' },
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
    width: 'auto'
  },

  linkDetail: {
    color: 'gray'
  }
}));

export default function PacienteList() {

  const classes = useStyles();

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const pacientesResponse = useQuery(GET_ALL)
  if (pacientesResponse.loading) return <LinearProgress color="secondary" />
  if (pacientesResponse.error) return pacientesResponse.error.message

  return (
    <Paper className={classes.root}>
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
            </TableRow>
          </TableHead>
          {pacientesResponse.data && <TableBody>
            {pacientesResponse.data.pacientes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell>{row.prontuario}</TableCell>
                  <TableCell>{row.pessoa?.nome}</TableCell>
                  <TableCell>{toPtBrDate(row.pessoa?.dataNascimento)}</TableCell>
                  <TableCell>{row.pessoa?.sexo}</TableCell>
                  <TableCell>{row.rg}</TableCell>
                  <TableCell>{row.cpf}</TableCell>
                  <TableCell>{row.cns}</TableCell>
                  <TableCell>
                    <Link to={`pacientes/${row.id}`} className={classes.linkDetail}>
                      <FileCopyIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>}
        </Table>
      </TableContainer>
      {pacientesResponse.data && <TablePagination
        labelRowsPerPage="Linhas por página"
        rowsPerPageOptions={[10, 25, 100]}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        component="div"
        count={pacientesResponse.data.pacientes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />}
      </div>
    </Paper>
  );
}
