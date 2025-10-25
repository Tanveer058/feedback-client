import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './components/AdminLogin';
import PageNotFound from './pages/PageNotFound';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';

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
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminPanel />} />
              <Route path="*" element={<PageNotFound/>} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;