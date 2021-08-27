import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

//import { getAccessToken } from '../access-token'
import { AppContext } from '../contexts/app-context'

/* const isAuthenticated = () => {
  const token = getAccessToken()
  if (token === '') {
    console.log(`isAuthenticated ${Date.now()}: !token`)
    return false
  } else {
    console.log('isAuthenticated: true')
    return true
  } */
  
  /* try {
    decodeToken(token)
    //if (Date.now() >= exp * 1000) {
      //console.log('isAuthenticated: now() >= exp')
      //return false
    //} else {
      console.log('isAuthenticated: true')
      return true
    //}
  } catch (err) {
    console.log('isAuthenticated: catch err')
    return false
  } */
//}

export default function PrivateRoute({ children, ...rest }) {

  const { appState } = useContext(AppContext)

  return (
    <Route 
      {...rest}
      render={({ location }) =>
        appState?.isLoggedIn ? (
          children
          ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />)
      }
    />
  )
}

export const Logout = ({ children, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={({ location }) => (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location }
          }}
        />
      )}
    />
  )
}