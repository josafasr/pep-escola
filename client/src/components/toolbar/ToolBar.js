/**
 * Componente para barra de menu superior
 * @author Josafá Santos
 */

import React from 'react'
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

  return (
    <div>
      { isLoggedin && 
        <div className="root">
          <AppBar position="static">
            <Toolbar className="tool-bar">
              <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Avatar className="logo" alt="Logo Uesb" src="/images/uesb.png" variant="square" />
              <Typography variant="h6" className="title">
                Prontuário Eletrônico CEUAS
              </Typography>
              <Button color="inherit">Logout</Button>
            </Toolbar>
          </AppBar>
        </div>
      }
    </div>
  )
}
