/**
 * Componente principal da aplicação cliente
 * @author Josafá Santos dos Reis
 */
import React, { useEffect, useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { StylesProvider } from '@material-ui/styles'

import PrivateRoute from './utils/auth'
import LoginForm from './forms/LoginForm'
import SideNav from './layout/side-nav'
import { setAccessToken } from './access-token'

function App() {

  const [loading, setLoading] = useState(true)

  const history = createBrowserHistory()

  useEffect(() => {
    console.log('useEffect /refresh');
    fetch(`${process.env.REACT_APP_API_URL}/refresh`, {
      method: 'POST',
      credentials: 'include'
    }).then(async res => {
      const { accessToken } = await res.json()

      setAccessToken(accessToken)
      setLoading(false)
    }).catch(console.error)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router basename="/appceuas" history={history}>
    {/* <Router> */}
      <StylesProvider injectFirst>
        <div className="App">
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            <PrivateRoute path="/">
            {/* <Route path="/"> */}
              <SideNav />
            {/* </Route> */}
            </PrivateRoute>
          </Switch>
        </div>
      </StylesProvider>
    </Router>
  )
}

export default App
