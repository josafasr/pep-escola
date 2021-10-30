import React, { createContext, useState } from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, Observable } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import decode from 'jwt-decode'

let accessToken = ''

export const AppContext = createContext({
  appState: {
    isLoggedIn: false,
    currentUser: undefined
  },
  setAccessToken: (token) => {},
  getAccessToken: () => {},
  setLoging: (token) => {},
  setLogout: () => {},
  setCurrentUser: (user) => {},
  getCurrentUser: () => {}
})

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({ isLoggedIn: false })

  
  const setAccessToken = (token) => {
    accessToken = token
  }
  
  const getAccessToken = () => {
    return accessToken
  }
  
  const setLoging = (token) => {
    setAccessToken(token)
    setAppState({ ...appState, isLoggedIn: true })
  }

  const setLogout = () => {
    setAccessToken('')
    setAppState({
      ...appState,
      isLoggedIn: false,
      currentUser: undefined
    })
  }

  const setCurrentUser = (user) => {
    setAppState({ ...appState, currentUser: user })
  }

  const decodeToken = (token) => {
    return decode(token, { algorithms: ['RS512'] })
  }

  const tokenRefreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
      const token = getAccessToken()
      if (token === '') {
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
      setLoging(accessToken)
    },
    handleError: err => {
      console.warn('Your refresh token is invalid. Pease, try to login again')
      console.error('handleError:', err.name, err.message)
      setLogout('')
    }
  })
  
  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle
        Promise.resolve(operation)
          .then(operation => {
            const accessToken = getAccessToken()
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
    }
    if (networkError) {
      console.log('networkError', networkError.message)
    }
  })
  
  const cache = new InMemoryCache({})
  
  const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    credentials: 'include'
  })

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
      reconnect: true
    }
  })

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink
  )
  
  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([
      tokenRefreshLink,
      requestLink,
      onErrorLink,
      link
    ]),
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

  return (
    <AppContext.Provider value={{ appState, setLoging, setLogout, setAccessToken, getAccessToken, setCurrentUser }}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </AppContext.Provider>
  )
}