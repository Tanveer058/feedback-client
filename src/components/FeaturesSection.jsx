import { Box, Grid, Paper, Typography, useTheme, useMediaQuery, Fade } from '@mui/material';
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
      description: 'Tell us about your experience and help us improve our services.'
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
      <Box sx={{ mb: isMobile ? 4 : 6 }}>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  color: 'white',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    background: 'rgba(255,255,255,0.15)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ opacity: 0.9, lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
};

export default FeaturesSection;