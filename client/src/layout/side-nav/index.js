import React, { useContext } from 'react'
//import { useApolloClient } from 'react-apollo'
//import gql from 'graphql-tag'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { Link, NavLink, Switch, Route, useHistory, useRouteMatch } from 'react-router-dom'
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
  MenuItem,
  Snackbar
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import GroupIcon from '@material-ui/icons/Group'
// import ViewListIcon from '@material-ui/icons/ViewList'
import MenuIcon from '@material-ui/icons/Menu'
import FolderIcon from '@material-ui/icons/Folder'
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CloseIcon from '@material-ui/icons/Close'
// import { deepPurple } from '@material-ui/core/colors'
import decode from 'jwt-decode'

//import Usuario from '../../components/usuario'
import UsuarioView from '../../pages/UsuarioView'
import PacienteView from '../../pages/PacienteView'
// import ConsultaEdit from '../../pages/ConsultaEdit'
import { GET_BY_ID, USER_LOGGED } from '../../graphql/usuario'
import { AppContext } from '../../contexts/app-context'

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
    backgroundColor: 'red', //#ff4c4c',
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
    backgroundColor: 'red' //deepPurple[500]
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
    backgroundColor: 'rgb(245, 245, 245)'
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflowX: 'auto'
  },

  home: {
    position: 'fixed',
    left: 0,
    height: '75vh',
    width: '100%',
    opacity: '30%',
    display: 'flex',
    //alignItems: 'center',
    justifyContent: 'center',
  }
}))

export default function SideNav(props) {

  const { window } = props

  const history = useHistory()

  const { path, url } = useRouteMatch()

  const { appState, getAccessToken, setCurrentUser } = useContext(AppContext)
  const { userId: decodedId } = decode(getAccessToken(), { algorithms: ['RS512'] })

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const [open, setOpen] = React.useState(true)

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const [openSnack, setOpenSnack] = React.useState(false)

  /* const handleClickSnack = () => {
    setOpenSnack(true)
  } */

  const handleCloseSnack = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnack(false);
  }

  const { loading } = useQuery(GET_BY_ID, {
    variables: { id: decodedId },
    onCompleted: data => {
      setCurrentUser(data.usuario)
    },
    skip: appState.currentUser !== undefined
  })

  useSubscription(USER_LOGGED, {
    //onSubscriptionData: ({ subscriptionData }) => {
    onSubscriptionData: () => {
      //console.log('SubscriptionData:', subscriptionData.data.userLogged)
      setOpenSnack(true)
    }
  })

  const isAdmin = appState.currentUser?.grupos?.some(grupo =>
    grupo.nome === 'Administradores'
  )

  //const client = useApolloClient()

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
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    history.push('/login')
  }

  const goToEdit = () => {
    history.push(`/usuarios/${decodedId}`)
    handleClose()
  }

/*   const { data } = useQuery(gql`
    {
      lastAction @client
    }`
  ) */

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  const drawer = (
    <div>
      <Toolbar>
        <Typography>
          Prontu??rio Eletr??nico CEUAS
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

        {!loading && <List>
          <ListItem
            button
            component={NavLink}
            exact
            to="/"
            className={classes.link}
            activeClassName={classes.selected}
          >
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="In??cio" />
          </ListItem>

          <ListItem
            button
            component={NavLink}
            to="/pacientes"
            className={classes.link}
            activeClassName={classes.selected}
          >
            <ListItemIcon><FolderIcon /></ListItemIcon>
            <ListItemText primary="Pacientes" />
          </ListItem>

          {/* <NavLink to="/agendamentos" className={classes.link} activeClassName={classes.selected}>
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
          </NavLink> */}

          {isAdmin && <ListItem
            button
            component={NavLink}
            to="/usuarios"
            className={classes.link}
            activeClassName={classes.selected}
          >
            <ListItemIcon><GroupIcon /></ListItemIcon>
            <ListItemText primary="Usu??rios" />
          </ListItem>}
        </List>}
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
              <Typography className={classes.titleBar} variant="h6" title="In??cio" noWrap>
                Prontu??rio Eletr??nico do Paciente
              </Typography>
              <Typography className={classes.titleBar} title="In??cio" noWrap>
                Centro Universit??rio de Aten????o ?? Sa??de - CEUAS
              </Typography>
            </Link>

          <div className={classes.toobar}>
            <Avatar className={classes.avatar} children="JS">
              <Button className={classes.avatarBtn} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVertIcon />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={goToEdit}>Meus Dados</MenuItem>
                {/* <MenuItem onClick={handleClose}>Informa????es</MenuItem> */}
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
          <Route exact path="/" render={() => <div className={classes.home}>
            <img src="/images/medicina.png" alt="Bras??o do Curso de Medicina" />
          </div>} />
          <Route path="/bloqueio">
            <div>N??o autorizado!</div>
          </Route>

          <Route path="/pacientes" component={PacienteView} />

          {/* <Route exact path="/consultas/:consultaId" component={ConsultaEdit} /> */}

          <Route exact path="/agendamentos" render={() => (<div>Em desenvolvimento....</div>)} />
          <Route exact path="/cadastros" render={() => (<div>Em desenvolvimento.....</div>)} />
          <Route path="/usuarios" component={UsuarioView} />
        </Switch>
      </main>

      <div>
        <Snackbar
          open={openSnack}
          autoHideDuration={5000}
          onClose={handleCloseSnack}
          message="Note archived"
          action={action}
        />
      </div>
    </div>
  )
}
