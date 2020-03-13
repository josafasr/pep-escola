/**
 * Componente principal da aplicação
 * @author Josafá Santos
 */
import React , { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import { StylesProvider } from '@material-ui/styles'

import './App.css'
import ToolBar from './components/toolbar/ToolBar'
import Login from './components/login/Login'
import Home from './components/home'
import Consulta from './components/consulta'
import Users from './components/user/Users'

function App(props) {
  const [isLoggedin, setIsLoggedin] = useState(false)

  useEffect (() => {
    const token = localStorage.getItem('token')
    if (token != null) {
      setIsLoggedin(true)
    }
  }, [])

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/api'
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? token : ''
      }
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <Router>
        <StylesProvider injectFirst>
        <ToolBar isLoggedin={isLoggedin} />
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/user">
              <Users />
            </Route>
            <Route path="/consulta">
              <Consulta />
            </Route>
          </Switch>
        </div>
        </StylesProvider>
      </Router>
    </ApolloProvider>
  )
}

export default App
