export const sendRefreshToken = (response, token) => {
  response.cookie(
    'jid',
    token,
    {
      httpOnly: true,
      path: '/refresh',
      
    }
  )
}