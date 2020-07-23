/**
 * @title Componente para acesso às informações de pacientes/prontuários
 * @module src/pages/PacienteView
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { Switch, Route, Link, useHistory, useRouteMatch, useParams } from 'react-router-dom'
import {
  CssBaseline,
  makeStyles,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core'

import PacienteEdit from './PacienteEdit'
import ConsultaList from './ConsultaList'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
    color: 'black',
    marginBottom: '2px'
  },

  tabTitle: {
    textTransform: 'none'
  }
}))

function PacienteView() {
  const classes = useStyles()
  const { path, url } = useRouteMatch()
  const { id } = useParams()
  const newPath = path.replace('/:id', '')
  const newUrl = url.substring(0, 10)

  const routes = [
    `${newPath}/:id`,
    `${newPath}/:id/consultas`,
    `${newPath}/:id/test`
  ]

  let history = useHistory()

  //const [value, setValue] = React.useState(0);

  /* const handleChange = (event, newValue) => {
    setValue(newValue);
  }; */

  return (
    <div>
    <CssBaseline />
    <AppBar className={classes.appBar} position="static">
      <Tabs
        value={history.location.pathname}
        //onChange={handleChange}
        variant="fullWidth"
        aria-label="simple tabs example"
      >
        <Tab
          className={classes.tabTitle}
          label="Paciente" 
          value={`${newUrl}/${id}`} 
          component={Link} 
          to={`${newUrl}/${id}`} 
        />

        <Tab 
          className={classes.tabTitle}
          label="Consultas" 
          value={`${newUrl}/${id}/consultas`} 
          component={Link} 
          to={`${newUrl}/${id}/consultas`} 
        />
      </Tabs>
    </AppBar>
    <Switch>
      <Route exact path={`${routes[0]}`} component={PacienteEdit} />
      <Route path={routes[1]} component={ConsultaList} />
      <Route path={routes[2]} component={() => { return (<div>Test</div>)}} />
    </Switch>
    </div>
  )
}
export default PacienteView