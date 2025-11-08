import { Box, Grid, Paper, Typography, useTheme, useMediaQuery, Fade, Container } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';

const FeaturesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <RateReviewIcon sx={{ fontSize: 40 }} />,
      title: 'Share Your Thoughts',
      description: 'Tell us about your experience and help us improve our services for you.'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Drive Improvements',
      description: 'Your feedback directly influences our product development and service quality.'
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      title: 'Join Our Community',
      description: 'Be part of a community that values continuous improvement and customer satisfaction.'
    }
  ];

  return (
    <Fade in timeout={1000}>
      <Container maxWidth="lg" sx={{ mb: isMobile ? 4 : 6 }}>
        {/* First two cards in normal grid */}
        <Grid container spacing={5} sx={{ mb: { xs: 6, md: 6 } }}>
          {features.slice(0, 2).map((feature, index) => (
            <Grid item xs={12} md={6} key={index} sx={{margin: 'auto'}}>
              <FeatureCard feature={feature} index={index} />
            </Grid>
          ))}
        </Grid>
        
        {/* Third card centered separately */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <Box 
            sx={{ 
              width: { xs: '100%', md: '66.666%', lg: '50%' },
              maxWidth: '600px'
            }}
          >
            <FeatureCard feature={features[2]} index={2} isCentered />
          </Box>
        </Box>
      </Container>
    </Fade>
  );
};

// Separate FeatureCard component for reusability
const FeatureCard = ({ feature, index, isCentered = false }) => {
  return (
    <Paper
      sx={{
        p: 3,
        color: 'white',

        textAlign: 'center',
        background: isCentered 
          ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)'
          : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        backdropFilter: 'blur(10px)',
        border: isCentered 
          ? '2px solid rgba(102, 126, 234, 0.3)'
          : '1px solid rgba(255,255,255,0.2)',
        borderRadius: 3,
        height: { xs: 'auto', sm: '220px', md: '240px' }, // Consistent height
        minHeight: '200px', // Minimum height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          background: isCentered 
            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)'
            : 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
        }
      }}
    >
      {/* Decorative background element */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          zIndex: 0
        }}
      />
      
      <Box sx={{ mb: 2, position: 'relative', zIndex: 1 }}>
        {feature.icon}
      </Box>
      
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ 
          fontWeight: 700,
          position: 'relative',
          zIndex: 1,
          // color: 'primary.main'
        }}
      >
        {feature.title}
      </Typography>
      
      <Typography 
        variant="body2" 
        sx={{ 
          opacity: 0.8, 
          lineHeight: 1.6,
          position: 'relative',
          zIndex: 1
        }}
      >
        {feature.description}
      </Typography>

      {/* Hover effect line */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          transform: 'scaleX(0)',
          transition: 'transform 0.3s ease',
        }}
        className="hover-line"
      />
    </Paper>
  );
};

export default FeaturesSection;