import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Chip,
  ChipProps,
  Pagination,
  Button,
  Badge,
} from '@mui/material';
import logo from '../assets/logo.png';
import React from 'react';

interface Student {
  id: number;
  name: string;
  age: number;
  course: string;
  education: string;
  mobile: string;
  status: string;
  followup_date: string | null;
  notes: string | null;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  limit: number;
}

interface Notification {
  id: number;
  name: string;
  status: string;
  followup_date: string | null;
}

const statusColors: Record<string, string> = {
  'Non responsive': 'default',
  'Not interested': 'error',
  'Not conversion': 'warning',
  'Follow up': 'info',
  'Future follow up': 'primary',
  'Conversion': 'success',
  'Dead': 'secondary'
};

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 10
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // demo purpose
  const navigate = useNavigate();

  // Fetch students
  const fetchStudents = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/students?page=${page}&limit=10`);
      setStudents(response.data.data);
      setFilteredStudents(response.data.data);
      setPagination(response.data.pagination);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  // Fetch notifications (follow up and future follow up)
  const fetchNotifications = async () => {
    try {
      const res = await axios.get<Notification[]>('http://localhost:5000/api/notifications', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      setNotifications(res.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchStudents(1);
    if (isLoggedIn) {
      fetchNotifications();
    }
  }, [isLoggedIn]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    fetchStudents(page);
  };

  const handleViewDetails = (id: number) => {
    navigate(`/students/${id}`);
  };

  const formatFollowupDate = (dateString: string | null | undefined) => {
    if (!dateString || dateString === '0000-00-00 00:00:00') return 'No date';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'No date' : date.toLocaleDateString();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) =>
        student.name.toLowerCase().includes(term) ||
        student.mobile.includes(term)
      );
      setFilteredStudents(filtered);
    }
  };

  const toggleNotesRow = (studentId: number) => {
    if (expandedRow === studentId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(studentId);
    }
  };

  // Handle Logout (demo: just set loggedIn to false and redirect)
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login'); // your login page route
  };

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Centered logo and heading */}
      <div className="flex flex-col items-center mb-4 space-y-2">
        <img src={logo} alt="Logo" className="w-66 h-16" />
        <h1 className="text-3xl font-bold text-center">Student Registrations</h1>
      </div>

      {/* Top controls: Search, Notifications button with badge, Logout button */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2 mb-6 w-full max-w-xl">
        <input
          type="text"
          placeholder="Search by name or mobile..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full md:w-80"
        />

        {/* Notifications button with badge */}
        <Badge
          badgeContent={notifications.length}
          color="error"
          invisible={notifications.length === 0}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/Notification')} // your notifications page route
          >
            Notifications
          </Button>
        </Badge>

        {/* Logout button */}
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="flex flex-col items-center w-full">
          {/* Student Table */}
          <div className="w-full overflow-x-auto border border-gray-300 rounded-lg shadow">
            <table className="min-w-full text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Education</th>
                  <th className="p-3">Mobile</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <React.Fragment key={student.id}>
                    <tr className="border-t border-gray-300">
                      <td className="p-3">{student.id}</td>
                      <td className="p-3">{student.name}</td>
                      <td className="p-3">{student.age}</td>
                      <td className="p-3">{student.course}</td>
                      <td className="p-3">{student.education}</td>
                      <td className="p-3">{student.mobile}</td>
                      <td className="p-3">
                        <Chip
                          label={
                            student.status === 'Follow up' || student.status === 'Future follow up'
                              ? `${student.status} (${formatFollowupDate(student.followup_date)})`
                              : student.status || 'No status'
                          }
                          color={(statusColors[student.status] as ChipProps['color']) || 'default'}
                        />
                      </td>
                      <td className="p-3 flex flex-col space-y-1">
                        <button
                          onClick={() => handleViewDetails(student.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow"
                        >
                          View
                        </button>
                        <button
                          onClick={() => toggleNotesRow(student.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow"
                        >
                          {expandedRow === student.id ? 'Hide Notes' : 'Show Notes'}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === student.id && (
                      <tr className="bg-gray-100 border-t border-gray-300">
                        <td colSpan={8} className="p-3 text-left">
                          {student.notes ? (
                            <p>{student.notes}</p>
                          ) : (
                            <p className="text-gray-600">No notes available.</p>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4">
            <Pagination
              count={pagination.totalPages}
              page={pagination.currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>

          {/* Records Info */}
          <p className="mt-2 text-sm text-gray-600 text-center">
            Showing {filteredStudents.length} of {pagination.totalRecords} records
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
