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
  Alert
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
      // update state only after successful delete
      setFeedbacks((prev) => prev.filter((f) => f._id !== id));
      setFilteredFeedbacks((prev) => prev.filter((f) => f._id !== id));
      // optionally refresh stats
      fetchAll();
    } else {
      throw new Error(resp?.data?.message || 'Delete failed');
    }
  } catch (err) {
    console.error('Delete failed', err);
    setError(err.response?.data?.message || err.message || 'Failed to delete feedback');
  }
};
  
// const adminUser = (() => {
//     try {
//       return JSON.parse(localStorage.getItem('adminUser') || '{}');
//     } catch {
//       return {};
//     }
//   })();

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5">
          {/* Welcome back, {adminUser.email || ''}!  */}
          Welcome back, Admin! 
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here's an overview of all feedback submissions
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <FeedbackIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h6">{stats.total}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Total Feedbacks
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <StarIcon color="warning" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h6">{Number(stats.avgRating).toFixed(1)}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Average Rating
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <TrendingUpIcon color="success" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h6">
                    {stats.distribution && stats.distribution.length > 0
                      ? Math.max(...stats.distribution.map((d) => d.count || 0))
                      : 0}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Highest Rating Count
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, email, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          sx={{ backgroundColor: 'white', borderRadius: 2 }}
        />
      </Box>

      {/* Error */}
      {error && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Feedbacks */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            All Feedbacks ({filteredFeedbacks.length})
          </Typography>
          <FeedbackTable feedbacks={filteredFeedbacks} onDelete={handleDelete} />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;