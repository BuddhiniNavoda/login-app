import { Box, IconButton, Typography } from '@mui/material'

type SocialButtonsProps = {
  onGoogleClick: () => void
}

function SocialButtons({ onGoogleClick }: SocialButtonsProps) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          my: 3,
        }}
      >
        <Box sx={{ flex: 1, height: 1, bgcolor: '#e6e6e6' }} />
        <Typography variant="body2" color="text.secondary">
          or continue with
        </Typography>
        <Box sx={{ flex: 1, height: 1, bgcolor: '#e6e6e6' }} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton
          aria-label="Continue with Google"
          onClick={onGoogleClick}
          sx={circleSx}
        >
          G
        </IconButton>
        <IconButton aria-label="Continue with Apple" sx={circleSx}>
          
        </IconButton>
        <IconButton aria-label="Continue with Facebook" sx={circleSx}>
          f
        </IconButton>
      </Box>
    </Box>
  )
}

const circleSx = {
  width: 48,
  height: 48,
  bgcolor: '#111111',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: 18,
  '&:hover': {
    bgcolor: '#000000',
  },
}

export default SocialButtons
