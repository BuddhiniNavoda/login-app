import { useEffect, useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { clearAuthSession } from '../lib/session.ts'

function TokenPage() {
  const [accessToken, setAccessToken] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    setAccessToken(sessionStorage.getItem('accessToken') ?? '')
    setEmail(sessionStorage.getItem('userEmail') ?? '')
  }, [])

  function handleBackToLogin() {
    clearAuthSession()
    window.location.assign('/')
  }

  if (!accessToken) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
        <Typography>No access token found. Please sign in.</Typography>
        <Button onClick={() => window.location.assign('/')} sx={{ mt: 2 }}>
          Go to login
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
      <Paper sx={{ p: 4, maxWidth: 720, width: '100%' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 800 }}>
          Signed in
        </Typography>
        {email ? (
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {email}
          </Typography>
        ) : null}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          accessToken
        </Typography>
        <Box
          component="pre"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            bgcolor: '#f6f6f6',
            p: 2,
            borderRadius: 2,
            fontSize: 13,
          }}
        >
          {accessToken}
        </Box>
        <Button variant="contained" onClick={handleBackToLogin} sx={{ mt: 3, borderRadius: 999 }}>
          Sign out
        </Button>
      </Paper>
    </Box>
  )
}

export default TokenPage
