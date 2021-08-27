/**
 * Componente principal da aplicação cliente
 * @author Josafá Santos dos Reis
 */
import React, { useContext, useEffect, useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { StylesProvider } from '@material-ui/styles'
import { makeStyles, CircularProgress } from '@material-ui/core'

//import PrivateRoute from './utils/auth'
import LoginForm from './forms/LoginForm'
import SideNav from './layout/side-nav'
//import { setAccessToken } from './access-token'
import { AppContext } from './contexts/app-context'

const useStyles = makeStyles({
  circularProgress: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export const App = () => {
  const classes = useStyles()

  const { appState, setLoging } = useContext(AppContext)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/refresh`, {
      method: 'POST',
      credentials: 'include'
    }).then(async res => {
      const { ok, accessToken } = await res.json()
      if (ok) {
        setLoging(accessToken)
      }
      setLoading(false)
    }).catch(console.error)
  }, [])

  if (loading) {
    return (
      <div className={classes.circularProgress}>
        <CircularProgress color="secondary" disableShrink />
      </div>
    )
  }

  return (
    <Router basename="/appceuas">
    {/* <Router> */}
      <StylesProvider injectFirst>
        <div className="App">
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            {/* <PrivateRoute path="/"> */}
            <Route path="/">
              {!appState.isLoggedIn ? <Redirect to="/login" /> : <SideNav />}
            </Route>
            {/* </PrivateRoute> */}
          </Switch>
        </div>
      </StylesProvider>
    </Router>
  )
}
