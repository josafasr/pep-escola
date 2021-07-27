import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import { TRY_LOGIN } from '../../graphql/usuario'

export const useLogin = (userData) => {
  const [tokens, setTokens] = React.useState({ token: '', reloadToken: '' })
  const [makeLogin, { loading, data }] = useLazyQuery(TRY_LOGIN, {
    variables: userData
  })

  React.useEffect(() => {
    if (data && !loading) {
      setTokens({
        token: data.login.token,
        reloadToken: data.login.reloadToken
      })
    }
  }, [data, loading])

  return { makeLogin, tokens}
}