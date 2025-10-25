import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
  InputAdornment,
  IconButton,
  Fade
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SecurityIcon from '@mui/icons-material/Security';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { adminAPI } from '../services/api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  // Responsive hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await adminAPI.login(formData);
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
        
        // Show success feedback before navigation
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 500);
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleDemoLogin = () => {
    setFormData({
      username: 'admin@example.com',
      password: 'admin123'
    });
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
        maxWidth: isTablet ? '400px' : '450px',
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
              {/* Header Icon */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: -6,
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 40 }} />
                </Box>
              </Box>

              {/* Title */}
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
                Admin Portal
              </Typography>
              
              <Typography 
                variant="body1" 
                align="center" 
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Access your feedback dashboard
              </Typography>

              {/* Error Alert */}
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

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                {/* Username Field */}
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                  required
                  disabled={loading}
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

                {/* Password Field */}
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePassword}
                          edge="end"
                          disabled={loading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
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

                {/* Login Button */}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1.1rem',
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
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              {/* Demo Credentials Section */}
              <Paper
                elevation={0}
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'warning.light',
                  border: '1px solid',
                  borderColor: 'warning.main',
                  textAlign: 'center'
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'warning.dark', mb: 1 }}>
                  Demo Credentials
                </Typography>
                <Typography variant="caption" display="block" color="warning.dark">
                  Username: <strong>admin@example.com</strong>
                </Typography>
                <Typography variant="caption" display="block" color="warning.dark">
                  Password: <strong>admin123</strong>
                </Typography>
                <Button
                  size="small"
                  onClick={handleDemoLogin}
                  disabled={loading}
                  sx={{
                    mt: 1,
                    textTransform: 'none',
                    color: 'warning.dark',
                    borderColor: 'warning.main',
                    '&:hover': {
                      backgroundColor: 'warning.main',
                      color: 'white'
                    }
                  }}
                  variant="outlined"
                >
                  Auto-fill Demo
                </Button>
              </Paper>

              {/* Footer Note */}
              <Typography 
                variant="caption" 
                color="text.secondary" 
                align="center" 
                display="block"
                sx={{ mt: 3 }}
              >
                Secure admin access only
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      </Box>

      {/* Add floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Box>
  );
};

export default AdminLogin;