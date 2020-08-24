import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import decode from 'jwt-decode'

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  const reloadToken = localStorage.getItem('reloadToken')
  try {
    decode(token)
    const { exp } = decode(reloadToken)
    if (Date.now() / 1000 > exp) {
      return false
    }
  } catch (err) {
    return false
  }
  return true
}

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route 
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}