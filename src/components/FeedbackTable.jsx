import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  Rating,
  Chip,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import { Delete, Email, Person } from '@mui/icons-material';

const FeedbackTable = ({ feedbacks, onDelete, isMobile }) => {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Mobile Card View
  if (isMobile) {
    return (
      <Box sx={{ p: 1 }}>
        <Stack spacing={2}>
          {feedbacks.map((feedback) => (
            <Card key={feedback._id} sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 2 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                      {feedback.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Email sx={{ fontSize: 16, mr: 0.5 }} />
                      {feedback.email}
                    </Typography>
                  </Box>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={() => onDelete(feedback._id)}
                    sx={{ ml: 1 }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={feedback.rating} readOnly size="small" />
                  <Chip 
                    label={`${feedback.rating}/5`} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{ ml: 1, height: 24 }}
                  />
                </Box>

                {/* Message */}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {feedback.message}
                </Typography>

                {/* Date */}
                <Typography variant="caption" color="text.secondary">
                  {formatDate(feedback.createdAt)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    );
  }

  // Desktop Table View
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: 'primary.light' }}>
          <TableRow>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Name</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Email</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Rating</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Message</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 600 }} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks.map((feedback) => (
            <TableRow 
              key={feedback._id} 
              sx={{ 
                '&:hover': { backgroundColor: 'action.hover' },
                '&:last-child td, &:last-child th': { border: 0 }
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="body2" fontWeight="500">
                    {feedback.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="primary.main">
                  {feedback.email}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={feedback.rating} readOnly size="small" />
                  <Chip 
                    label={`${feedback.rating}/5`} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                </Box>
              </TableCell>
              <TableCell sx={{ maxWidth: 300 }}>
                <Typography 
                  variant="body2" 
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {feedback.message}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(feedback.createdAt)}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <IconButton
                  color="error"
                  onClick={() => onDelete(feedback._id)}
                  size="small"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeedbackTable;