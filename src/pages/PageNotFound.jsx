import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { motion } from 'framer-motion';

const PageNotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: {
        type: "spring",
        stiffness: 400
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          animation: 'float 8s ease-in-out infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          animation: 'float 6s ease-in-out infinite 1s'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          animation: 'float 10s ease-in-out infinite 0.5s'
        }}
      />

      <Container maxWidth="md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Paper
            elevation={24}
            sx={{
              p: isMobile ? 4 : 6,
              borderRadius: 4,
              textAlign: 'center',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative corner accents */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, transparent 50%, rgba(102, 126, 234, 0.1) 50%)',
                borderTopLeftRadius: 4
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'linear-gradient(315deg, transparent 50%, rgba(118, 75, 162, 0.1) 50%)',
                borderBottomRightRadius: 4
              }}
            />

            {/* Main Content */}
            <motion.div variants={itemVariants}>
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                style={{ display: 'inline-block' }}
              >
                <SentimentDissatisfiedIcon
                  sx={{
                    fontSize: isMobile ? 80 : 120,
                    color: 'primary.main',
                    mb: 2,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant={isMobile ? "h2" : "h1"}
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  mb: 1
                }}
              >
                404
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 2
                }}
              >
                Oops! Page Not Found
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                color="text.secondary"
                sx={{
                  maxWidth: '400px',
                  mx: 'auto',
                  mb: 4,
                  lineHeight: 1.6
                }}
              >
                The page you're looking for doesn't exist or has been moved. 
                Let's get you back on track!
              </Typography>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                onClick={handleGoBack}
                startIcon={<ArrowBackIcon />}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: isMobile ? 1 : 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                  }
                }}
              >
                Go Back
              </Button>

              <Button
                variant="outlined"
                size={isMobile ? "medium" : "large"}
                onClick={handleGoHome}
                startIcon={<HomeIcon />}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: isMobile ? 1 : 1.5,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    border: '2px solid',
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }
                }}
              >
                Home Page
              </Button>
            </motion.div>

            {/* Additional Help */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  mt: 4,
                  fontStyle: 'italic'
                }}
              >
                If you believe this is an error, please contact support
              </Typography>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>

      {/* Floating animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Box>
  );
};

export default PageNotFound;