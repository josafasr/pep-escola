/**
 * @title Componente para acesso às informações de usuários
 * @module src/pages/UsuarioView
 * @author Josafá Santos dos Reis
 */

import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import {
  CssBaseline,
  makeStyles
} from '@material-ui/core'

import UsuarioList from './UsuarioList'
import UsuarioEdit from './UsuarioEdit'

const UsuarioView = () => {
  const { path } = useRouteMatch()
  console.log(path);

  return (
    <div>
      <Switch>
        <Route path={`${path}/criar`} component={UsuarioEdit} />
        <Route path={`${path}/:id`} children={<UsuarioEdit />} />
        <Route exact path={`${path}/`} component={UsuarioList} />
      </Switch>
    </div>
  )
}
export default UsuarioView