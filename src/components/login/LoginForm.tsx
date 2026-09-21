import { type FormEvent, useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined'
import SocialButtons from './SocialButtons.tsx'
import { validateLogin } from '../../lib/validateLogin.ts'

type LoginFormProps = {
  onGoogleClick: () => void
  onEmailLogin: (email: string, password: string) => Promise<void>
  onRegister: (email: string, password: string) => Promise<void>
  isSubmitting: boolean
}

function LoginForm({ onGoogleClick, onEmailLogin, onRegister, isSubmitting }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  async function submitWith(
    action: (email: string, password: string) => Promise<void>,
    event?: FormEvent<HTMLFormElement>,
  ) {
    event?.preventDefault()
    const nextErrors = validateLogin({ email, password })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    await action(email, password)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 420 }}>
      <Typography variant="h3" component="h1" sx={{ fontSize: { xs: 32, md: 40 } }}>
        Welcome back!
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1.5, mb: 4, lineHeight: 1.6 }}>
        Simplify your workflow and boost your productivity
        <br />
        with Tuga’s App. Get started for free.
      </Typography>

      <Box component="form" onSubmit={(event) => void submitWith(onEmailLogin, event)} noValidate>
        <TextField
          fullWidth
          placeholder="Gmail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
          autoComplete="email"
          disabled={isSubmitting}
          sx={fieldSx}
        />
        <TextField
          fullWidth
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
          autoComplete="current-password"
          disabled={isSubmitting}
          sx={{ ...fieldSx, mt: 2 }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((value) => !value)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5, mb: 3 }}>
          <Link href="#" underline="none" color="text.primary" variant="body2">
            Forgot Password?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{
            py: 1.4,
            borderRadius: 999,
            bgcolor: '#111111',
            '&:hover': { bgcolor: '#000000' },
          }}
        >
          {isSubmitting ? 'Signing in…' : 'Login'}
        </Button>
      </Box>

      <SocialButtons onGoogleClick={onGoogleClick} />

      <Typography variant="body2" sx={{ mt: 5, textAlign: 'center' }}>
        Not a member?{' '}
        <Link
          href="#"
          underline="none"
          color="secondary"
          sx={{ fontWeight: 700 }}
          onClick={(event) => {
            event.preventDefault()
            void submitWith(onRegister)
          }}
        >
          Register now
        </Link>
      </Typography>
    </Box>
  )
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 999,
    bgcolor: '#fff',
    '& fieldset': {
      borderColor: '#d9d9d9',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
  },
}

export default LoginForm
