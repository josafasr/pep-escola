/**
 * Componente para barra de menu superior
 * @author Josafá Santos
 */

import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import './ToolBar.css'

export default function ToolBar(props) {

  const isLoggedin = props.isLoggedin

  const history = useHistory()

  const logout = () => {
    history.push('/login')
  }

  return (
    <div>
      { isLoggedin && 
        <div className="root">
          <AppBar position="fixed">
            <Toolbar className="tool-bar">
              <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Avatar className="logo" alt="Logo Uesb" src="/images/uesb.png" variant="square" />
              <Typography variant="h6" className="title">
                Prontuário Eletrônico CEUAS
              </Typography>
              <Button className="logout-button" color="inherit" onClick={logout}>Sair</Button>
            </Toolbar>
          </AppBar>
        </div>
      }
    </div>
  )
}
