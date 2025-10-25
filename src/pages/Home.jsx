import { Box, Container, Typography } from '@mui/material';
import FeedbackForm from '../components/FeedbackForm';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mt: 6, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Share Your Experience
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your feedback helps us improve our services
          </Typography>
        </Box>

        <FeedbackForm />
      </Container>
    </>
  );
};

export default Home;