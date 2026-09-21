import { Box } from '@mui/material'
import heroImage from '../../assets/hero.png'

function HeroPanel() {
  return (
    <Box
      sx={{
        bgcolor: '#eef7f0',
        borderRadius: 6,
        height: '100%',
        minHeight: { md: 640 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { md: 6 },
        py: 6,
      }}
    >
      <Box
        component="img"
        src={heroImage}
        alt="Person working on a laptop with messages"
        sx={{ width: 'min(560px, 90%)', display: 'block' }}
      />
    </Box>
  )
}

export default HeroPanel
