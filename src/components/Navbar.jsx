import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import logo from '../assets/fb-collection-logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const isAdminRoute = location.pathname.includes('/admin');
  const token = localStorage.getItem('adminToken');
  
  // State for mobile menu
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
    setDrawerOpen(false);
    setMobileMenuAnchor(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
    setMobileMenuAnchor(null);
  };

  // Mobile drawer content
  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      {/* Logo Section */}
      <Box sx={{ p: 2, textAlign: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Box
          component="img"
          src={logo}
          alt="Feedback System"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          sx={{ 
            width: isSmallMobile ? 120 : 140, 
            height: 'auto',
            borderRadius: 1
          }}
        />
        {!logo && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FeedbackIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" color="primary.main">
              Feedback System
            </Typography>
          </Box>
        )}
      </Box>

      <List sx={{ py: 1 }}>
        {/* Home Link */}
        {!isAdminRoute && (
          <ListItem 
            button 
            onClick={() => handleNavigation('/')}
            selected={location.pathname === '/'}
          >
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        )}

        {/* Admin Links */}
        {!isAdminRoute && (
          <ListItem 
            button 
            onClick={() => handleNavigation('/admin/login')}
          >
            <ListItemIcon>
              <LoginIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Admin Login" />
          </ListItem>
        )}

        {isAdminRoute && token && location.pathname !== '/admin/dashboard' && (
          <ListItem 
            button 
            onClick={() => handleNavigation('/admin/dashboard')}
            selected={location.pathname === '/admin/dashboard'}
          >
            <ListItemIcon>
              <DashboardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        )}

        {isAdminRoute && token && (
          <ListItem 
            button 
            onClick={handleLogout}
          >
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>

      <Divider />

      {/* User Info */}
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          {token ? 'Admin Mode' : 'Public Mode'}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {/* Logo/Brand Section */}
          <Box
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexGrow: 1, 
              cursor: 'pointer',
              minWidth: 0 // Allow shrinking on mobile
            }}
            onClick={() => navigate('/')}
          >
            {/* Logo Image */}
            <Box
              component="img"
              src={logo}
              alt="Feedback Collection System"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              sx={{ 
                width: isSmallMobile ? 120 : 150,
                height: 'auto',
                mr: 1,
                borderRadius: 1
              }}
            />
            
            {/* Fallback Logo with Icon and Text */}
            {!logo && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FeedbackIcon sx={{ 
                  mr: 1, 
                  fontSize: isSmallMobile ? 24 : 28,
                  color: 'white'
                }} />
                <Typography 
                  variant={isSmallMobile ? "h6" : "h5"} 
                  component="div"
                  sx={{ 
                    fontWeight: 600,
                    display: isMobile ? 'none' : 'block'
                  }}
                >
                  Feedback System
                </Typography>
              </Box>
            )}
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {!isAdminRoute && (
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/')}
                  startIcon={<HomeIcon />}
                  sx={{ 
                    mx: 0.5,
                    borderRadius: 2,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Home
                </Button>
              )}

              {!isAdminRoute && (
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/admin/login')}
                  startIcon={<LoginIcon />}
                  sx={{ 
                    mx: 0.5,
                    borderRadius: 2,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Admin Login
                </Button>
              )}

              {isAdminRoute && token && location.pathname !== '/admin/dashboard' && (
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/admin/dashboard')}
                  startIcon={<DashboardIcon />}
                  sx={{ 
                    mx: 0.5,
                    borderRadius: 2,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Dashboard
                </Button>
              )}

              {isAdminRoute && token && (
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{ 
                    mx: 0.5,
                    borderRadius: 2,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Logout
                </Button>
              )}
            </Box>
          )}

          {/* Mobile Navigation - Hamburger Menu */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{
                ml: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Menu (Fallback) */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        {!isAdminRoute && (
          <MenuItem onClick={() => handleNavigation('/')}>
            <HomeIcon sx={{ mr: 2, fontSize: 20 }} />
            Home
          </MenuItem>
        )}

        {!isAdminRoute && (
          <MenuItem onClick={() => handleNavigation('/admin/login')}>
            <LoginIcon sx={{ mr: 2, fontSize: 20 }} />
            Admin Login
          </MenuItem>
        )}

        {isAdminRoute && token && location.pathname !== '/admin/dashboard' && (
          <MenuItem onClick={() => handleNavigation('/admin/dashboard')}>
            <DashboardIcon sx={{ mr: 2, fontSize: 20 }} />
            Dashboard
          </MenuItem>
        )}

        {isAdminRoute && token && (
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
            Logout
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Navbar;