export type LoginValues = {
  email: string
  password: string
}

export type LoginErrors = {
  email?: string
  password?: string
}

const GMAIL_PATTERN = /^[^\s@]+@gmail\.com$/i

export function validateLogin({ email, password }: LoginValues): LoginErrors {
  const errors: LoginErrors = {}

  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!GMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Enter a valid Gmail address (example@gmail.com)'
  }

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return errors
}
