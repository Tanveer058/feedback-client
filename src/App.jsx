// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Home from './pages/Home';
// import AdminPanel from './pages/AdminPanel';
// import AdminLogin from './components/AdminLogin';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#667eea',
//     },
//     secondary: {
//       main: '#764ba2',
//     },
//   },
//   typography: {
//     fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
//   },
// });

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path="/admin" element={<AdminPanel />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './components/AdminLogin';

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;