import React, { useEffect } from 'react'
import { Switch, Link, Route, useHistory } from 'react-router-dom';
import clsx from 'clsx'
import {
  makeStyles,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Hidden,
  Typography,
  Avatar,
  Menu,
  MenuItem
} from '@material-ui/core'
import GroupIcon from '@material-ui/icons/Group'
import ViewListIcon from '@material-ui/icons/ViewList'
import MenuIcon from '@material-ui/icons/Menu'
import FolderIcon from '@material-ui/icons/Folder'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import { deepPurple } from '@material-ui/core/colors'

import Usuario from '../../components/usuario'
import UsuarioList from '../../components/usuario/UsuarioList'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    overflowX: 'hidden'
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },

  drawerPaper: {
    width: drawerWidth
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
  },

  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7)//,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9) + 1
    // }
  },

  appBar: {
    backgroundColor: 'red',
    zIndex: theme.zIndex.drawer + 1,
  },

  toobar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },

  logo: {
    height: '100%'
  },

  titleBar: {
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },

  avatar: {
    alignSelf: 'flex-end',
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: deepPurple[500]
  },

  avatarBtn: {
    width: '100%',
    height: '100%',
    color: 'white'
  },

  linkList: {
    textDecoration: 'none',
    color: 'black',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflowX: 'auto'
  }
}))

export default function SideNav(props) {

  const { window, match } = props

  const history = useHistory()

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const [open, setOpen] = React.useState(true)

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login')
    }
  })

  const toggleDrawer = (mobileOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setMobileOpen(mobileOpen)    
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('reloadtoken')
    history.push('/login')
  }

  const drawer = (
    <div>
      <Toolbar>
        <Typography>
          Prontuário Eletrônico CEUAS
        </Typography>
      </Toolbar>

      {/* <Divider /> */}

      <div
        // className={classes.drawer}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}

        <Divider />

        <List>
          {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
          
          <Link to={`${match.url}prontuarios`} className={classes.linkList}>
            <ListItem button>
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary="Prontuários" />
            </ListItem>
          </Link>

          <Link to={`${match.url}agendamentos`} className={classes.linkList}>
            <ListItem button>
              <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
              <ListItemText primary="Agendamento" />
            </ListItem>
          </Link>

          <Link to={`${match.url}cadastros`} className={classes.linkList}>
            <ListItem button>
              <ListItemIcon><ViewListIcon /></ListItemIcon>
              <ListItemText primary="Cadastro" />
            </ListItem>
          </Link>

          <Link to="/usuarios" className={classes.linkList}>
            <ListItem button>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Usuários" />
            </ListItem>
          </Link>
        </List>
      </div>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <Hidden smUp implementation="css">
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={toggleDrawer(true)}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Hidden xsDown implementation="css">
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={toggleOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          {/* <Avatar className={classes.logo} alt="Logo Uesb" src="/images/uesb.png" variant="square" /> */}
          <Typography className={classes.titleBar} variant="h6" noWrap>
            Prontuário Eletrônico CEUAS
          </Typography>
          <div className={classes.toobar}>
            <Avatar className={classes.avatar} children="JS">
              <Button className={classes.avatarBtn} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                U
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Informações</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>
            </Avatar>
          </div>
        </Toolbar>
      </AppBar>
      <Hidden smUp implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer(false)}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawer}    
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          variant="permanent"
          open={open}
        >
          {drawer}    
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route path={`${match.path}prontuarios`} render={() => (<div>Em desenvolvimento...</div>)} />
          <Route path={`${match.path}agendamentos`} render={() => (<div>Em desenvolvimento....</div>)} />
          <Route path={`${match.path}cadastros`} render={() => (<div>Em desenvolvimento.....</div>)} />
          <Route exact path="/usuarios/criar" render={() => (<Usuario />)} />
          <Route path="/usuarios/:id" children={<Usuario />} />
          <Route path={`${match.path}usuarios`} component={UsuarioList} />
          <Route path={`${match.path}`} render={() => (<div>Bem vind@!</div>)} />
        </Switch>
      </main>
    </div>
  )
}
