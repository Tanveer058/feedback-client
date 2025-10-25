// import { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Rating,
//   Typography,
//   Box,
//   Alert,
//   CircularProgress
// } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import { feedbackAPI } from '../services/api';

// const FeedbackForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     rating: 0,
//     message: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       await feedbackAPI.create(formData);
//       setSuccess('Thank you for your feedback! 🎉');
//       setFormData({ name: '', email: '', rating: 0, message: '' });
//       setTimeout(() => setSuccess(''), 5000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to submit feedback');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         bgcolor: '#f5f5f5'
//       }}
//     >
//       <Card sx={{ maxWidth: 600, width: '100%', m: 2 }}>
//         <CardContent>
//           <Typography variant="h4" align="center" gutterBottom>
//             We'd Love Your Feedback! 💬
//           </Typography>

//           {success && (
//             <Alert severity="success" sx={{ mb: 2 }}>
//               {success}
//             </Alert>
//           )}
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               label="Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               margin="normal"
//               required
//             />

//             <TextField
//               fullWidth
//               label="Email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               margin="normal"
//               required
//             />

//             <Box sx={{ mt: 3, mb: 2 }}>
//               <Typography component="legend">
//                 How would you rate your experience?
//               </Typography>
//               <Rating
//                 name="rating"
//                 value={formData.rating}
//                 onChange={(e, newValue) => setFormData({ ...formData, rating: newValue })}
//                 size="large"
//                 required
//               />
//             </Box>

//             <TextField
//               fullWidth
//               label="Your Message"
//               name="message"
//               multiline
//               rows={4}
//               value={formData.message}
//               onChange={handleChange}
//               margin="normal"
//               required
//             />

//             <Button
//               fullWidth
//               type="submit"
//               variant="contained"
//               disabled={loading}
//               startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
//               sx={{
//                 mt: 3,
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 '&:hover': {
//                   background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
//                 }
//               }}
//             >
//               {loading ? 'Submitting...' : 'Submit Feedback'}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default FeedbackForm;




import { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Rating,
  Typography,
  Box,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Paper,
  Fade,
  InputAdornment,
  Chip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import StarIcon from '@mui/icons-material/Star';
import { feedbackAPI } from '../services/api';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    rating: false,
    message: false
  });

  // Responsive hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, rating: newValue });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    if (!formData.name || !formData.email || !formData.rating || !formData.message) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      await feedbackAPI.create(formData);
      setSuccess('Thank you for your valuable feedback! 🎉');
      setFormData({ name: '', email: '', rating: 0, message: '' });
      setTouched({ name: false, email: false, rating: false, message: false });
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ratingLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  };

  const getRatingText = () => {
    return formData.rating ? ratingLabels[formData.rating] : 'Select your rating';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: isMobile ? 2 : 3,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          animation: 'float 8s ease-in-out infinite'
        }}
      />

      <Box sx={{ 
        width: '100%', 
        maxWidth: isTablet ? '500px' : '600px',
        zIndex: 1 
      }}>
        <Fade in timeout={800}>
          <Card 
            sx={{ 
              borderRadius: 3,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              overflow: 'visible',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <CardContent sx={{ 
              p: isMobile ? 3 : 4,
              position: 'relative'
            }}>
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography 
                  variant={isMobile ? "h4" : "h3"} 
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  Share Your Feedback
                </Typography>
                <Typography 
                  variant={isMobile ? "body1" : "h6"} 
                  color="text.secondary"
                >
                  Your opinion helps us improve and serve you better
                </Typography>
              </Box>

              {/* Success/Error Messages */}
              {success && (
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    alignItems: 'center'
                  }}
                  onClose={() => setSuccess('')}
                >
                  {success}
                </Alert>
              )}
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    alignItems: 'center'
                  }}
                  onClose={() => setError('')}
                >
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  margin="normal"
                  required
                  disabled={loading}
                  error={touched.name && !formData.name}
                  helperText={touched.name && !formData.name ? 'Name is required' : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'background.paper',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'grey.50'
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'white',
                        boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.2)'
                      }
                    }
                  }}
                />

                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  margin="normal"
                  required
                  disabled={loading}
                  error={touched.email && (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))}
                  helperText={
                    touched.email && !formData.email ? 'Email is required' :
                    touched.email && !/\S+@\S+\.\S+/.test(formData.email) ? 'Please enter a valid email' : ''
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'background.paper',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'grey.50'
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'white',
                        boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.2)'
                      }
                    }
                  }}
                />

                {/* Rating Section */}
                <Paper
                  elevation={0}
                  sx={{
                    mt: 3,
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: 'grey.50',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <StarIcon color="primary" />
                    How would you rate your experience?
                  </Typography>
                  
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Rating
                      name="rating"
                      value={formData.rating}
                      onChange={handleRatingChange}
                      size={isMobile ? "large" : "large"}
                      icon={<StarIcon sx={{ fontSize: isMobile ? 32 : 40 }} />}
                      emptyIcon={<StarIcon sx={{ fontSize: isMobile ? 32 : 40, opacity: 0.3 }} />}
                    />
                  </Box>

                  <Box sx={{ textAlign: 'center' }}>
                    <Chip
                      label={getRatingText()}
                      color={formData.rating ? "primary" : "default"}
                      variant={formData.rating ? "filled" : "outlined"}
                      sx={{ 
                        fontWeight: 600,
                        fontSize: isMobile ? '0.8rem' : '0.9rem'
                      }}
                    />
                  </Box>

                  {touched.rating && !formData.rating && (
                    <Typography 
                      variant="caption" 
                      color="error" 
                      sx={{ display: 'block', textAlign: 'center', mt: 1 }}
                    >
                      Please select a rating
                    </Typography>
                  )}
                </Paper>

                {/* Message Field */}
                <TextField
                  fullWidth
                  label="Your Feedback Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur('message')}
                  margin="normal"
                  required
                  disabled={loading}
                  error={touched.message && !formData.message}
                  helperText={
                    touched.message && !formData.message ? 'Message is required' :
                    `${formData.message.length}/500 characters`
                  }
                  inputProps={{ maxLength: 500 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                        <MessageIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'background.paper',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'grey.50'
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'white',
                        boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.2)'
                      }
                    }
                  }}
                />

                {/* Submit Button */}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                  sx={{
                    mt: 3,
                    py: isMobile ? 1.5 : 2,
                    borderRadius: 2,
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                    },
                    '&:disabled': {
                      transform: 'none',
                      boxShadow: 'none'
                    }
                  }}
                >
                  {loading ? 'Submitting Feedback...' : 'Submit Feedback'}
                </Button>
              </form>

              {/* Footer Note */}
              <Typography 
                variant="caption" 
                color="text.secondary" 
                align="center" 
                display="block"
                sx={{ mt: 3 }}
              >
                We value your privacy and will never share your information
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      </Box>

      {/* Floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Box>
  );
};

export default FeedbackForm;
