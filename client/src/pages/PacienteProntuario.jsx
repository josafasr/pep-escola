/**
 * @description Componente para acesso às informações do prontuário do paciente
 * @module src/pages/PacienteProntuario
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { Switch, Route, Link, useHistory, useRouteMatch } from 'react-router-dom'
import {
  CssBaseline,
  makeStyles,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core'

import PacienteEdit from './PacienteEdit'
import ConsultaList from './ConsultaList'
import ConsultaEdit from './ConsultaEdit'

const useStyles = makeStyles({
  appBar: {
    backgroundColor: 'white',
    color: 'black',
    marginBottom: '2px'
  },

  tabTitle: {
    textTransform: 'none'
  }
})

const PacienteProntuario = () => {
  const classes = useStyles()
  const { path, url } = useRouteMatch()

  /* const routes = [
    `${path}`,
    `${path}/consultas`
  ] */

  let history = useHistory()

  return (
    <div>
    <CssBaseline />
    <AppBar className={classes.appBar} position="static">
      <Tabs
        value={history.location.pathname}
        variant="fullWidth"
        aria-label="simple tabs example"
      >
        <Tab
          className={classes.tabTitle}
          label="Paciente" 
          value={`${url}`} 
          component={Link} 
          to={`${url}`} 
        />

        <Tab 
          className={classes.tabTitle}
          label="Consultas" 
          value={`${url}/consultas`} 
          component={Link} 
          to={`${url}/consultas`} 
          //disabled={true}
        />
      </Tabs>
    </AppBar>
    <Switch>
      {/* <Route exact path={routes[0]} component={PacienteEdit} /> */}
      {/* <Route exact path={routes[1]} component={ConsultaList} /> */}
      <Route exact path="/pacientes/:id" component={PacienteEdit} />
      <Route path="/pacientes/:id/consultas" component={ConsultaList} />
      {/* <Route exact path={`${path}/:pacienteId/consultas/criar`} component={ConsultaEdit} /> */}
    </Switch>
    </div>
  )
}

export default PacienteProntuario