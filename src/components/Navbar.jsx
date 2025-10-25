import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from '../assets/fb-collection-logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.includes('/admin');
  const token = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          {/* logo image (fallback to icon if missing) */}
          <Box
            component="img"
            src={logo}
            alt="Logo"
            onError={(e) => {
              // fallback to icon when image not found
              e.currentTarget.style.display = 'none';
            }}
            sx={{ width: 150, mr: 1, borderRadius: 1 }}
          />
          {/* <Typography variant="h6" component="div">
            <FeedbackIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Feedback Collection System
          </Typography> */}
        </Box>

        <Box>
          {!isAdminRoute && (
            <Button 
              color="inherit" 
              onClick={() => navigate('/admin/login')}
              sx={{ mx: 1 }}
            >
              Admin Login
            </Button>
          )}
          {isAdminRoute && token && location.pathname !== '/admin/dashboard' && (
            <Button 
              color="inherit" 
              onClick={() => navigate('/admin/dashboard')}
              startIcon={<DashboardIcon />}
              sx={{ mx: 1 }}
            >
              Dashboard
            </Button>
          )}
          {isAdminRoute && token && (
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ mx: 1 }}
            >
              Logout
            </Button>
          )}
          {!isAdminRoute && (
            <Button 
              color="inherit" 
              onClick={() => navigate('/')}
              startIcon={<HomeIcon />}
              sx={{ mx: 1 }}
            >
              Home
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;