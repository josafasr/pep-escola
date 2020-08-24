/**
 * Componente principal da aplicação cliente
 * @author Josafá Santos dos Reis
 */
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, from } from 'apollo-link'
import { StylesProvider } from '@material-ui/styles'

import PrivateRoute from './utils/auth'
import LoginForm from './forms/LoginForm'
import SideNav from './layout/side-nav'

function App(props) {

  const httpLink = new HttpLink({
    //uri: `https://${window.location.hostname}/api`
    uri: `http://${window.location.hostname}:4000/api`
  })

  const authMiddleware = new ApolloLink((operation, forward) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token')
    const reloadToken = localStorage.getItem('reloadToken')

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        'x-token': token ? token : '',
        'x-reload-token': reloadToken ? reloadToken : ''
      }
    }))

    return forward(operation)
  })

  const afterMiddleware = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
      const context = operation.getContext()
      const { response: { headers } } = context

      if (headers) {
        const token = headers.get('x-token')
        const reloadToken = headers.get('x-reload-token')

        if (token) {
          localStorage.setItem('token', token)
        }

        if (reloadToken) {
          localStorage.setItem('reloadToken', reloadToken)
        }
      }
      return response
    })
  }) 

  const client = new ApolloClient({
    link: from([
            authMiddleware,
            afterMiddleware,
            httpLink
          ]),
    cache: new InMemoryCache(),
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  })

  return (
    <ApolloProvider client={client}>
      <Router basename="/appceuas">
      {/* <Router> */}
        <StylesProvider injectFirst>
          <div className="App">
            <Switch>
              <Route path="/login">
                <LoginForm />
              </Route>
              <PrivateRoute path="/">
                <SideNav />
              </PrivateRoute>
            </Switch>
          </div>
        </StylesProvider>
      </Router>
    </ApolloProvider>
  )
}

export default App
