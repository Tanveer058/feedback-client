import React, { useState } from 'react';
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
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Alert,
  Fade
} from '@mui/material';
import { Delete, Email, Person, Warning } from '@mui/icons-material';

const FeedbackTable = ({ feedbacks, onDelete, isMobile }) => {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for delete confirmation modal
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    feedback: null
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Open delete confirmation modal
  const handleDeleteClick = (feedback) => {
    setDeleteModal({
      open: true,
      feedback: feedback
    });
  };

  // Close delete confirmation modal
  const handleCloseModal = () => {
    setDeleteModal({
      open: false,
      feedback: null
    });
  };

  // Confirm and execute deletion
  const handleConfirmDelete = () => {
    if (deleteModal.feedback) {
      onDelete(deleteModal.feedback._id);
      handleCloseModal();
    }
  };

  // Delete Confirmation Modal Component
  const DeleteConfirmationModal = () => (
    <Dialog
      open={deleteModal.open}
      onClose={handleCloseModal}
      aria-labelledby="delete-confirmation-title"
      aria-describedby="delete-confirmation-description"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }
      }}
    >
      <DialogTitle 
        id="delete-confirmation-title"
        sx={{ 
          backgroundColor: 'error.light',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Warning sx={{ fontSize: 24 }} />
        Confirm Deletion
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Warning 
            sx={{ 
              fontSize: 48, 
              color: 'error.main',
              mb: 1
            }} 
          />
        </Box>

        <DialogContentText 
          id="delete-confirmation-description"
          sx={{ 
            textAlign: 'center',
            fontSize: '1.1rem',
            color: 'text.primary',
            mb: 2
          }}
        >
          Are you sure you want to delete this feedback?
        </DialogContentText>

        {deleteModal.feedback && (
          <Fade in timeout={500}>
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 2,
                borderRadius: 2,
                backgroundColor: 'warning.light',
                color: 'warning.dark'
              }}
            >
              <Typography variant="body2" fontWeight="600">
                This action cannot be undone
              </Typography>
              <Typography variant="caption" display="block">
                Feedback from <strong>{deleteModal.feedback.name}</strong> will be permanently deleted.
              </Typography>
            </Alert>
          </Fade>
        )}

        {deleteModal.feedback && (
          <Card variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Feedback Preview:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={deleteModal.feedback.rating} readOnly size="small" />
                <Chip 
                  label={`${deleteModal.feedback.rating}/5`} 
                  size="small" 
                  sx={{ ml: 1 }} 
                />
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontStyle: 'italic'
                }}
              >
                "{deleteModal.feedback.message}"
              </Typography>
            </CardContent>
          </Card>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={handleCloseModal}
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            px: 3,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          variant="contained"
          color="error"
          startIcon={<Delete />}
          sx={{ 
            borderRadius: 2,
            px: 3,
            textTransform: 'none',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #ee5a52 0%, #ff6b6b 100%)',
              boxShadow: '0 6px 20px rgba(255, 107, 107, 0.6)'
            }
          }}
        >
          Delete Permanently
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Mobile Card View
  if (isMobile) {
    return (
      <>
        <Box sx={{ p: 1 }}>
          <Stack spacing={2}>
            {feedbacks.map((feedback) => (
              <Card 
                key={feedback._id} 
                sx={{ 
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                        {feedback.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        <Email sx={{ fontSize: 16, mr: 0.5 }} />
                        {feedback.email}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => handleDeleteClick(feedback)}
                      sx={{ 
                        ml: 1,
                        '&:hover': {
                          backgroundColor: 'error.light',
                          color: 'white'
                        }
                      }}
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

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal />
      </>
    );
  }

  // Desktop Table View
  return (
    <>
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
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
                  '&:last-child td, &:last-child th': { border: 0 },
                  transition: 'background-color 0.2s ease'
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
                    onClick={() => handleDeleteClick(feedback)}
                    size="small"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'error.light',
                        color: 'white'
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal />
    </>
  );
};

export default FeedbackTable;