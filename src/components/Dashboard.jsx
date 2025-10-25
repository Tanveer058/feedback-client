import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FeedbackIcon from '@mui/icons-material/Feedback';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FeedbackTable from './FeedbackTable';
import { feedbackAPI } from '../services/api';

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    avgRating: 0,
    distribution: []
  });

  // Mobile responsiveness hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFeedbacks(feedbacks);
      return;
    }
    const term = searchTerm.toLowerCase();
    setFilteredFeedbacks(
      feedbacks.filter(
        (f) =>
          (f.name || '').toLowerCase().includes(term) ||
          (f.email || '').toLowerCase().includes(term) ||
          (f.message || '').toLowerCase().includes(term)
      )
    );
  }, [searchTerm, feedbacks]);

  const fetchAll = async () => {
    setLoading(true);
    setError('');
    try {
      const [listResp, statsResp] = await Promise.all([
        feedbackAPI.getAll(),
        feedbackAPI.getStats().catch(() => ({ data: { data: { totalFeedbacks: 0, averageRating: 0, ratingDistribution: [] } } }))
      ]);
      const items = listResp?.data?.data || [];
      setFeedbacks(items);
      setFilteredFeedbacks(items);
      const s = statsResp?.data?.data || {};
      setStats({
        total: s.totalFeedbacks ?? 0,
        avgRating: s.averageRating ?? 0,
        distribution: s.ratingDistribution ?? []
      });
    } catch (err) {
      console.error(err);
      setError('Failed to fetch feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      const resp = await feedbackAPI.delete(id);
      if (resp?.data?.success) {
        setFeedbacks((prev) => prev.filter((f) => f._id !== id));
        setFilteredFeedbacks((prev) => prev.filter((f) => f._id !== id));
        fetchAll();
      } else {
        throw new Error(resp?.data?.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Delete failed', err);
      setError(err.response?.data?.message || err.message || 'Failed to delete feedback');
    }
  };

  return (
    <Box sx={{ 
      p: isMobile ? 1 : 3,
      minHeight: '100vh',
      backgroundColor: '#f8fafc'
    }}>
      {/* Welcome Section */}
      <Box sx={{ 
        mb: isMobile ? 2 : 3,
        textAlign: isMobile ? 'center' : 'left'
      }}>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            mb: 1
          }}
        >
          Welcome back, Admin!
        </Typography>
        <Typography 
          variant={isMobile ? "body2" : "subtitle1"} 
          color="text.secondary"
        >
          Here's an overview of all feedback submissions
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: isMobile ? 2 : 3 }}>
        <Grid item xs={12} sm={4}>
          <Card 
            sx={{ 
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }
            }}
          >
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Box display="flex" alignItems="center">
                <Box 
                  sx={{ 
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: 'primary.light',
                    mr: 2
                  }}
                >
                  <FeedbackIcon sx={{ color: 'white', fontSize: isMobile ? 20 : 24 }} />
                </Box>
                <Box>
                  <Typography 
                    variant={isMobile ? "h5" : "h4"} 
                    sx={{ fontWeight: 700, color: 'primary.main' }}
                  >
                    {stats.total}
                  </Typography>
                  <Typography 
                    variant={isMobile ? "caption" : "body2"} 
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    Total Feedbacks
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card 
            sx={{ 
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }
            }}
          >
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Box display="flex" alignItems="center">
                <Box 
                  sx={{ 
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: 'warning.light',
                    mr: 2
                  }}
                >
                  <StarIcon sx={{ color: 'white', fontSize: isMobile ? 20 : 24 }} />
                </Box>
                <Box>
                  <Typography 
                    variant={isMobile ? "h5" : "h4"} 
                    sx={{ fontWeight: 700, color: 'warning.main' }}
                  >
                    {Number(stats.avgRating).toFixed(1)}
                  </Typography>
                  <Typography 
                    variant={isMobile ? "caption" : "body2"} 
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    Average Rating
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card 
            sx={{ 
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }
            }}
          >
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Box display="flex" alignItems="center">
                <Box 
                  sx={{ 
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: 'success.light',
                    mr: 2
                  }}
                >
                  <TrendingUpIcon sx={{ color: 'white', fontSize: isMobile ? 20 : 24 }} />
                </Box>
                <Box>
                  <Typography 
                    variant={isMobile ? "h5" : "h4"} 
                    sx={{ fontWeight: 700, color: 'success.main' }}
                  >
                    {stats.distribution && stats.distribution.length > 0
                      ? Math.max(...stats.distribution.map((d) => d.count || 0))
                      : 0}
                  </Typography>
                  <Typography 
                    variant={isMobile ? "caption" : "body2"} 
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    Highest Rating Count
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search Section */}
      <Box sx={{ mb: isMobile ? 2 : 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={isMobile ? "Search feedback..." : "Search by name, email, or message..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              backgroundColor: 'white',
              fontSize: isMobile ? '14px' : '16px'
            }
          }}
          size={isMobile ? "small" : "medium"}
        />
      </Box>

      {/* Error Alert */}
      {error && (
        <Box sx={{ mb: 2 }}>
          <Alert 
            severity="error" 
            sx={{ 
              borderRadius: 2,
              fontSize: isMobile ? '12px' : '14px'
            }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        </Box>
      )}

      {/* Loading State */}
      {loading ? (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          sx={{ 
            mt: 6,
            minHeight: isMobile ? '200px' : '300px'
          }}
        >
          <Box textAlign="center">
            <CircularProgress size={isMobile ? 40 : 60} />
            <Typography 
              variant={isMobile ? "body2" : "body1"} 
              color="text.secondary" 
              sx={{ mt: 2 }}
            >
              Loading feedback data...
            </Typography>
          </Box>
        </Box>
      ) : (
        /* Feedbacks Section */
        <Box>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            sx={{ 
              mb: 2,
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            All Feedbacks ({filteredFeedbacks.length})
          </Typography>
          <Box 
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <FeedbackTable 
              feedbacks={filteredFeedbacks} 
              onDelete={handleDelete}
              isMobile={isMobile}
            />
          </Box>
        </Box>
      )}

      {/* Empty State */}
      {!loading && filteredFeedbacks.length === 0 && searchTerm && (
        <Box 
          textAlign="center" 
          sx={{ 
            mt: 4,
            p: 3
          }}
        >
          <SearchIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No feedbacks found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search terms
          </Typography>
        </Box>
      )}

      {!loading && filteredFeedbacks.length === 0 && !searchTerm && (
        <Box 
          textAlign="center" 
          sx={{ 
            mt: 4,
            p: 3
          }}
        >
          <FeedbackIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No feedbacks yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Customer feedback will appear here once submitted
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;