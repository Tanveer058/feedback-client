import { Container } from '@mui/material';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import PrivateRoute from '../utils/PrivateRoute';

const AdminPanel = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </Container>
    </>
  );
};

export default AdminPanel;