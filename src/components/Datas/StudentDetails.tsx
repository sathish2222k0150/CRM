import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  ChipProps,
  TextField,
  Stack,
  TextareaAutosize
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface StudentDetails {
  id: number;
  name: string;
  age: number;
  course: string;
  education: string;
  mobile: string;
  whatsapp: string | null;
  email: string;
  city: string;
  state: string;
  status: string;
  followup_date: string | null;
  notes: string | null;
  created_at: string;
}

const statusOptions = [
  'Non responsive',
  'Not interested',
  'Not conversion',
  'Follow up',
  'Future follow up',
  'Conversion',
  'Dead'
];

const statusColors: Record<string, string> = {
  'Non responsive': 'default',
  'Not interested': 'error',
  'Not conversion': 'warning',
  'Follow up': 'info',
  'Future follow up': 'primary',
  'Conversion': 'success',
  'Dead': 'secondary'
};

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState<Dayjs | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/students/${id}`);
        const data = response.data;
        setStudent(data);
        setStatus(data.status || '');
        setNotes(data.notes || '');
        setFollowUpDate(data.followup_date ? dayjs(data.followup_date) : null);
        if (['Follow up', 'Future follow up'].includes(data.status)) {
          setShowDatePicker(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student details:', error);
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    const requiresDate = ['Follow up', 'Future follow up'].includes(newStatus);
    setShowDatePicker(requiresDate);
    if (!requiresDate) {
      setFollowUpDate(null);
    }
  };

  const handleFollowUpDateChange = (date: Dayjs | null) => {
    setFollowUpDate(date);
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`http://localhost:5000/api/students/${id}/status`, {
        status,
        followup_date:
          (status === 'Follow up' || status === 'Future follow up') && followUpDate
            ? followUpDate.format('YYYY-MM-DD')
            : null,
        notes
      });

      if (student) {
        setStudent({
          ...student,
          status,
          notes,
          followup_date:
            (status === 'Follow up' || status === 'Future follow up') && followUpDate
              ? followUpDate.format('YYYY-MM-DD')
              : null
        });
      }
      alert('Status and notes updated successfully.');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status and notes.');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!student) {
    return <Typography>Student not found</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <Button variant="outlined" color="secondary" onClick={handleBack}>
          Back to Dashboard
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Student Details
        </Typography>

        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Typography variant="h6">Status:</Typography>
          <Chip
            label={status || 'No status'}
            color={(statusColors[status] as ChipProps['color']) || 'default'}
            sx={{ mr: 2 }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Change Status</InputLabel>
            <Select value={status} onChange={(e) => handleStatusChange(e.target.value)} label="Change Status">
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleUpdateStatus} color="primary">
            Update Status
          </Button>

          {showDatePicker && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <DatePicker
                label="Follow-up Date"
                value={followUpDate}
                onChange={handleFollowUpDateChange}
                format="YYYY-MM-DD"
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    size: 'small'
                  } satisfies Partial<React.ComponentProps<typeof TextField>>
                }}
              />
              <Button variant="contained" onClick={handleUpdateStatus} color="success">
                Update Follow-up Date
              </Button>
            </Stack>
          )}
        </Box>

        {/* Replace Grid with flexbox Boxes */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            maxWidth: 1200,
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <Box
            sx={{
              flex: '1 1 300px',
              minWidth: 300,
              border: '2px solid #1976d2',
              p: 2,
              height: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
              Notes
            </Typography>
            <TextareaAutosize
              minRows={15}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                boxSizing: 'border-box',
              }}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about the student..."
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={handleUpdateStatus}
                color="primary"
                sx={{ width: '100%' }}
              >
                Save Notes
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              flex: '2 1 600px',
              minWidth: 300,
              border: '2px solid #1976d2',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {[
                    ['ID', student.id],
                    ['Name', student.name],
                    ['Age', student.age],
                    ['Course', student.course],
                    ['Education', student.education],
                    ['Mobile', student.mobile],
                    ['WhatsApp', student.whatsapp || 'N/A'],
                    ['Email', student.email],
                    ['City', student.city],
                    ['State', student.state],
                    [
                      'Follow-up Date',
                      student.followup_date
                        ? new Date(student.followup_date).toLocaleDateString()
                        : 'N/A',
                    ],
                    ['Registration Date', new Date(student.created_at).toLocaleString()],
                  ].map(([label, value]) => (
                    <TableRow key={label} sx={{ borderBottom: '1px solid #ccc' }}>
                      <TableCell
                        sx={{
                          backgroundColor: '#e3f2fd',
                          fontWeight: 'bold',
                          borderRight: '2px solid #1976d2',
                          width: '40%',
                        }}
                      >
                        {label}
                      </TableCell>
                      <TableCell sx={{ width: '60%' }}>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDetails;
