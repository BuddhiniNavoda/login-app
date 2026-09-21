import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#111111',
    },
    secondary: {
      main: '#2f7a4b',
    },
    text: {
      primary: '#111111',
      secondary: '#7a7a7a',
    },
    background: {
      default: '#ffffff',
      paper: '#eef7f0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
    h3: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
})

export default theme
