import { Box, Container, Paper, Typography, Fade } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import FeedbackForm from '../components/FeedbackForm';
// import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TrustIndicators from '../components/TrustIndicators';
import BackgroundElements from '../components/BackgroundElements';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Elements */}
      <BackgroundElements />

      {/* <Navbar /> */}

      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          py: isMobile ? 4 : 6
        }}
      >
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Feedback Form Section */}
        <Fade in timeout={1200}>
          <Box>
            <Paper
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Box sx={{ p: isMobile ? 3 : 4 }}>
                <Typography 
                  variant={isMobile ? "h5" : "h4"} 
                  align="center" 
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 1
                  }}
                >
                  Share Your Feedback
                </Typography>
                <Typography 
                  variant="body1" 
                  align="center" 
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  We're listening and committed to making things better
                </Typography>
                
                <FeedbackForm />
              </Box>
            </Paper>
          </Box>
        </Fade>

        {/* Trust Indicators */}
        <TrustIndicators />
      </Container>
    </Box>
  );
};

export default Home;