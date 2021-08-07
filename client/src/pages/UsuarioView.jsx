/**
 * @description Componente para acesso às informações de usuários
 * @module src/pages/UsuarioView
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import {
  CssBaseline
} from '@material-ui/core'

import UsuarioList from './UsuarioList'
import UsuarioEdit from './UsuarioEdit'

const UsuarioView = () => {
  const { path } = useRouteMatch()

  return (
    <div>
      <CssBaseline />
      <Switch>
        <Route path={`${path}/criar`} component={UsuarioEdit} />
        <Route path={`${path}/:userId`} component={UsuarioEdit} />
        <Route path={`${path}/:userId/editar`} component={UsuarioEdit} />
        <Route path={`${path}/:userId/alterar-senha`} component={UsuarioEdit} />
        <Route exact path={`${path}/`} component={UsuarioList} />
      </Switch>
    </div>
  )
}
export default UsuarioView