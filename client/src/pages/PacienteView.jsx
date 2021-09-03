/**
 * @description Componente para acesso às informações de pacientes/prontuários
 * @module src/pages/PacienteView
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import PacienteList from './PacienteList'
import PacienteEdit from './PacienteEdit'
import ConsultaEdit from './ConsultaEdit'
import PacienteProntuario from './PacienteProntuario'

function PacienteView() {
  const { path } = useRouteMatch()

  return (
    <div>
    <CssBaseline />
    <Switch>
      <Route exact path={`${path}/`} component={PacienteList} />
      <Route path={`${path}/criar`} component={PacienteEdit} />
      <Route exact path={`${path}/:id`} component={PacienteEdit} />
      <Route path={`${path}/:id/editar`} component={PacienteEdit} />
      <Route path={`${path}/:id/prontuario`} component={PacienteProntuario} />
      <Route exact path={`${path}/:pacienteId/consultas/criar`} component={ConsultaEdit} />
      <Route exact path={`${path}/:pacienteId/consultas/:consultaId`} component={ConsultaEdit} />
    </Switch>
    </div>
  )
}
export default PacienteView