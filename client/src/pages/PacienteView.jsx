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
import ConsultaList from './ConsultaList'

function PacienteView() {
  const { path } = useRouteMatch()

  return (
    <div>
    <CssBaseline />
    <Switch>
      <Route exact path="/pacientes" component={PacienteList} />
      <Route path="/pacientes/criar" component={PacienteEdit} />
      <Route path={`/pacientes/:pacienteId/consultas/criar`} component={ConsultaEdit} />
      <Route path="/pacientes/:id/editar" component={PacienteEdit} />
      <Route path={`/pacientes/:pacienteId/consultas/:consultaId`} component={ConsultaEdit} />
      <Route path="/pacientes/:id" component={PacienteProntuario} />
    </Switch>
    </div>
  )
}
export default PacienteView