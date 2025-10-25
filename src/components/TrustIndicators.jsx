import { Box, Typography, Fade } from '@mui/material';

const TrustIndicators = () => {
  return (
    <Fade in timeout={1500}>
      <Box sx={{ textAlign: 'center', mt: 6, color: 'white' }}>
        <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
          Trusted by companies and users worldwide
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: 4,
            flexWrap: 'wrap',
            opacity: 0.7
          }}
        >
          <Typography variant="caption">✓ 100% Secure</Typography>
          <Typography variant="caption">✓ Privacy Protected</Typography>
          <Typography variant="caption">✓ Instant Submission</Typography>
        </Box>
      </Box>
    </Fade>
  );
};

export default TrustIndicators;