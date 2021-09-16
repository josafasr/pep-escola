/**
 * @description Componente para listagem de usuários
 * @module src/pages/UsuarioList
 * @author Josafá Santos dos Reis
 */

import React /* , { useEffect } */ from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import {
  makeStyles,
  LinearProgress,
  Paper,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TablePagination,
  // TableRow,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Button
 } from '@material-ui/core'
 import PersonIcon from '@material-ui/icons/Person'

import { GET_ALL } from '../graphql/usuario'

const columns = [
  //{ id: 'id', label: 'Id', minWidth: 50 },
  { id: 'pessoa.nome', label: 'Nome', minWidth: 107 },
  { id: 'nome', label: 'Nome de Usuário', minWidth: 100 },
  { id: 'pessoa.contato.email', label: 'E-mail', minWidth: 100 },
  { id: 'editCell', label: 'Detalhes', minWidth: 30 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  
  button: {
    margin: theme.spacing(1)
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
    margin: '0 10px 0 0'
  }
}));

export default function UsuarioList(props) {

  const classes = useStyles();
  /* const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }; */

  const { loading, error, data } = useQuery(GET_ALL)

  if (loading) return <LinearProgress color="secondary" />
  if (error) return 'Erro :('

  return (
    <Paper className={classes.root} elevation={0}>
      <Link to="/usuarios/criar">
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          color="primary"
        >
          Criar usuário
        </Button>
      </Link>
      <div>
        <List>
          {data.usuarios.map(usuario =>
            <Paper className={classes.listItemPaper} key={usuario.id}>
              <ListItem component={Link} to={`/usuarios/${usuario.id}`}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <div className={classes.listItemInfo}>
                  <p><b>{usuario.pessoa.nome}</b></p>
                  <div>
                    <p className={classes.column}><b>Nome de Usuário:</b> <span>{usuario.nome}</span></p>
                    {/* <p className={classes.column}>
                      <b>Data Nascimento:</b> <span>{ptBrDate(usuario.pessoa.dataNascimento)}</span>
                    </p> */}
                    <p className={classes.column}><b>E-mail:</b> <span>{usuario.pessoa.contato.email}</span></p>
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
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {!!data && <TableBody>
              {data.usuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.pessoa?.nome}</TableCell>
                    <TableCell>{row.nome}</TableCell>
                    <TableCell>{row.pessoa?.contato?.email}</TableCell>
                    <TableCell>
                      <Link to={`usuarios/${row.id}`} className={classes.linkDetail}>
                        <FileCopyIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>}
          </Table>
        </TableContainer> */}
        {/* {!!data && <TablePagination
          labelRowsPerPage="Linhas por página"
          rowsPerPageOptions={[10, 25, 100]}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          component="div"
          count={data.usuarios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />} */}
      </div>
    </Paper>
  );
}
