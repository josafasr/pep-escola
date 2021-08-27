import React, { createContext, useState } from 'react'

const initialState = {
  authState = { isLogged: false },
  tokenState = { token: '' }
}

export const AppStateContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ isLogged: false })
  const [tokenState, setTokenState] = useState({ token: '' })

  return (
    <AppStateContext.Provider value={{ authState, setAuthState, tokenState, setTokenState }}>
      {children}
    </AppStateContext.Provider>
  )
}