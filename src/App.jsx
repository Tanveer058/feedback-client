import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import PageNotFound from './pages/PageNotFound';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';
import TrustIndicators from './components/TrustIndicators';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>

              {/* Public route - only accessible when NOT logged in */}

              <Route path="/"
                element={
                  <PublicRoute>
                    <Home />
                  </PublicRoute>
                }
              />
              
              <Route 
                path="/admin/login" 
                element={
                  <PublicRoute>
                    <AdminLogin />
                  </PublicRoute>
                } 
              />
              
              {/* Protected route - only accessible when logged in */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <PrivateRoute>
                    <AdminPanel />
                  </PrivateRoute>
                } 
              />

              {/* Catch all route for 404 */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Box>
          <TrustIndicators />
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;