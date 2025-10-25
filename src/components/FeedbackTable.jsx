import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Rating,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import { feedbackAPI } from '../services/api';

const FeedbackTable = ({ feedbacks, onDelete }) => {
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, name: '' });

  const handleDeleteClick = (id, name) => {
    setDeleteDialog({ open: true, id, name });
  };

  const handleDeleteConfirm = async () => {
    try {
      await feedbackAPI.delete(deleteDialog.id);
      onDelete(deleteDialog.id);
      setDeleteDialog({ open: false, id: null, name: '' });
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete feedback');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, id: null, name: '' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="feedback table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="h6" color="text.secondary">
                      No feedback found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Feedbacks will appear here once submitted
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              feedbacks.map((feedback) => (
                <TableRow key={feedback._id}>
                  <TableCell>{feedback.name}</TableCell>
                  <TableCell>{feedback.email}</TableCell>
                  <TableCell>
                    <Rating value={feedback.rating} readOnly size="small" />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={feedback.message}>
                      <Typography
                        sx={{
                          maxWidth: 200,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {feedback.message}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{formatDate(feedback.createdAt)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(feedback._id, feedback.name)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(211, 47, 47, 0.1)'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={handleDeleteCancel}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="warning" />
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete feedback from {deleteDialog.name}?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteConfirm}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FeedbackTable;