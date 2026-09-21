import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Snackbar } from '@mui/material'
import HeroPanel from '../components/login/HeroPanel.tsx'
import LoginForm from '../components/login/LoginForm.tsx'
import { registerWithEmail, signInWithEmail } from '../lib/signInWithEmail.ts'
import { signInWithGoogle } from '../lib/signInWithGoogle.ts'

function LoginPage() {
  const navigate = useNavigate()
  const [authError, setAuthError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function runAuth(action: () => Promise<unknown>) {
    setIsSubmitting(true)
    try {
      await action()
      navigate('/token')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign-in failed'
      setAuthError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        px: { xs: 2.5, md: 5 },
        py: { xs: 3, md: 4 },
        gap: { md: 5 },
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoginForm
          isSubmitting={isSubmitting}
          onGoogleClick={() => void runAuth(signInWithGoogle)}
          onEmailLogin={(email, password) => runAuth(() => signInWithEmail(email, password))}
          onRegister={(email, password) => runAuth(() => registerWithEmail(email, password))}
        />
      </Box>

      <Box
        sx={{
          flex: 1.15,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <HeroPanel />
      </Box>

      <Snackbar
        open={Boolean(authError)}
        autoHideDuration={5000}
        onClose={() => setAuthError('')}
      >
        <Alert severity="error" onClose={() => setAuthError('')}>
          {authError}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default LoginPage
