import { Box, Typography, useTheme, useMediaQuery, Fade } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Fade in timeout={800}>
      <Box sx={{ textAlign: 'center', mb: isMobile ? 4 : 6 }}>
        <Typography 
          variant={isMobile ? "h3" : "h2"} 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 800,
            color: 'white',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
            mb: 2
          }}
        >
          Your Voice Matters
        </Typography>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          sx={{ 
            color: 'white', 
            opacity: 0.9,
            maxWidth: '600px',
            mx: 'auto',
            mb: 3,
            fontWeight: 300
          }}
        >
          Share your experience and help us create better services for everyone
        </Typography>
        
        {/* Rating Stats */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: 3,
            flexWrap: 'wrap',
            mt: 4
          }}
        >
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
              <StarIcon sx={{ color: '#FFD700' }} />
              <StarIcon sx={{ color: '#FFD700' }} />
              <StarIcon sx={{ color: '#FFD700' }} />
              <StarIcon sx={{ color: '#FFD700' }} />
              <StarIcon sx={{ color: '#FFD700' }} />
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
              Rated 4.8/5 by our community
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              500+
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Feedback Collected
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default HeroSection;