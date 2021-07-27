import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, Observable } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { TokenRefreshLink } from 'apollo-link-token-refresh'

import App from './App'
import { setAccessToken, getAccessToken } from './access-token'
import { decodeToken } from './utils/auth'

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken()
    if (!token) {
      return true
    }

    try {
      const { exp } = decodeToken(token)
      if (Date.now() >= exp * 1000) {
        return false
      } else {
        return true
      }
    } catch {
      return false
    }
  },
  fetchAccessToken: () => {
    return fetch(`${process.env.REACT_APP_API_URL}/refresh`, {
      method: 'POST',
      credentials: 'include'
    })
  },
  handleFetch: accessToken => {
    console.log('handleFetch: accessToken =>', accessToken)
    setAccessToken(accessToken)
  },
  handleError: err => {
    console.warn('Your refresh token is invalid. Pease, try to login again')
    console.error('handleError:', err.name, err.message)
    setAccessToken(null)
  }
})

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(operation => {
          const accessToken = getAccessToken()
          console.log('requestLink accessToken:', accessToken)
          if (accessToken) {
            operation.setContext({
              headers: { Authorization: `Bearer ${accessToken}` }
            })
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))
      
      return () => {
        if (handle)
          handle.unsubscribe()
      }
    })
)

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors:', graphQLErrors)
    setAccessToken(null)
  }
  if (networkError) {
    console.log('networkError', networkError.message)
    setAccessToken(null)
  }
})

const cache = new InMemoryCache({})

const httpLink = new HttpLink({
  //uri: `https://${window.location.hostname}/api`
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  credentials: 'include'
})

/* cache.writeData({
  data: {
    isLoggedIn: false,
    //lastAction: new Date()
  }
}) */

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    tokenRefreshLink,
    //refreshTokenLink,
    requestLink,
    onErrorLink,
    //responseLink,
    httpLink
  ]),
  /* resolvers: {
    Query: {
      lastAction: () => new Date()
    }
  }, */
  //queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only'
      //fetchPolicy: 'cache-and-network'
      //nextFetchPolicy: 'cache-first',
      //errorPolicy: 'all',
      //returnPartialData: true
    }
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'))
