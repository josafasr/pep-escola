import React, { useEffect } from 'react'
import { Link, NavLink, Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';
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
import HomeIcon from '@material-ui/icons/Home'
import GroupIcon from '@material-ui/icons/Group'
import ViewListIcon from '@material-ui/icons/ViewList'
import MenuIcon from '@material-ui/icons/Menu'
import FolderIcon from '@material-ui/icons/Folder'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import { deepPurple } from '@material-ui/core/colors'

//import Usuario from '../../components/usuario'
import UsuarioView from '../../pages/UsuarioView'
import PacienteEdit from '../../pages/PacienteEdit'
import PacienteList from '../../pages/PacienteList'
import PacienteView from '../../pages/PacienteView'
import ConsultaEdit from '../../pages/ConsultaEdit'

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
    width: theme.spacing(7)
  },

  appBar: {
    backgroundColor: '#ff4c4c',
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

  link: {
    textDecoration: 'none',
    color: 'inherit',
  },

  selected: {
    backgroundColor: 'rgb(223, 223, 223)'
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflowX: 'auto'
  }
}))

export default function SideNav(props) {

  const { window } = props

  const history = useHistory()

  const { url } = useRouteMatch()

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
    localStorage.removeItem('reloadToken')
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
        <Divider />

        <List>
          <NavLink to={url} className={classes.link} activeClassName={classes.selected}>
            <ListItem button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Início" />
            </ListItem>
          </NavLink>

          <NavLink to="/pacientes" className={classes.link} activeClassName={classes.selected}>
            <ListItem button>
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary="Prontuários" />
            </ListItem>
          </NavLink>

          <NavLink to="/agendamentos" className={classes.link} activeClassName={classes.selected}>
            <ListItem button>
              <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
              <ListItemText primary="Agendamento" />
            </ListItem>
          </NavLink>

          <NavLink to="/cadastros" className={classes.link} activeClassName={classes.selected}>
            <ListItem button>
              <ListItemIcon><ViewListIcon /></ListItemIcon>
              <ListItemText primary="Cadastro" />
            </ListItem>
          </NavLink>

          <NavLink to="/usuarios" className={classes.link} activeClassName={classes.selected}>
            <ListItem button>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Usuários" />
            </ListItem>
          </NavLink>
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

            <Link to="/" className={classes.link}>
              <Typography className={classes.titleBar} variant="h6" title="Início" noWrap>
                Prontuário Eletrônico CEUAS
              </Typography>
            </Link>

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
          <Route exact path="/pacientes" component={PacienteList} />
          <Route exact path="/pacientes/criar" component={PacienteEdit} />
          <Route exact path="/pacientes/:id/consultas/criar" children={<ConsultaEdit />} />
          <Route path="/pacientes/:id">
            <PacienteView />
          </Route>

          <Route exact path="/consultas/:id" component={ConsultaEdit} />

          {/* <Route exact path="/paciente/consultas" children={<PacienteView />} /> */}
          <Route exact path="/agendamentos" render={() => (<div>Em desenvolvimento....</div>)} />
          <Route exact path="/cadastros" render={() => (<div>Em desenvolvimento.....</div>)} />
          {/* <Route exact path="/usuarios/criar" component={Usuario} />
          <Route exact path="/usuarios/:id" children={<Usuario />} /> */}
          <Route path="/usuarios" component={UsuarioView} />
        </Switch>
      </main>
    </div>
  )
}
