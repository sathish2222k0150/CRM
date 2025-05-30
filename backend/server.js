// server.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || ''
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Create tables if they don't exist
const createTables = () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      phone_number VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_verified BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  const sessionsTable = `
    CREATE TABLE IF NOT EXISTS sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      token VARCHAR(255) NOT NULL,
      login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      logout_time TIMESTAMP NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`;

  db.query(usersTable, (err) => {
    if (err) throw err;
    console.log('Users table ready');
  });

  db.query(sessionsTable, (err) => {
    if (err) throw err;
    console.log('Sessions table ready');
  });
};

createTables();

// Register
app.post('/api/register', async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const [existingUser] = await db.promise().query(
      'SELECT * FROM users WHERE phone_number = ?',
      [phoneNumber]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.promise().query(
      'INSERT INTO users (phone_number, password, is_verified) VALUES (?, ?, TRUE)',
      [phoneNumber, hashedPassword]
    );

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const [users] = await db.promise().query(
      'SELECT * FROM users WHERE phone_number = ?',
      [phoneNumber]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, phoneNumber: user.phone_number },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    await db.promise().query(
      'INSERT INTO sessions (user_id, token) VALUES (?, ?)',
      [user.id, token]
    );

    res.json({ token, userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Logout
app.post('/api/logout', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    await db.promise().query(
      'UPDATE sessions SET logout_time = CURRENT_TIMESTAMP WHERE token = ?',
      [token]
    );

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging out' });
  }
});

// Middleware for protected routes
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Protected example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Valid status types
const validStatuses = [
  'Non responsive',
  'Not interested',
  'Not conversion',
  'Follow up',
  'Future follow up',
  'Conversion',
  'Dead'
];

// Paginated students
app.get('/api/students', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  db.query('SELECT COUNT(*) as total FROM registrations', (err, countResults) => {
    if (err) {
      console.error('Error fetching count:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const total = countResults[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(
      'SELECT id, name, age, course, education, mobile, status, followup_date, notes FROM registrations LIMIT ? OFFSET ?',
      [limit, offset],
      (err, rows) => {
        if (err) {
          console.error('Error fetching students:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        const data = rows.map((student) => ({
          ...student,
          followup_date: student.followup_date || null
        }));

        res.json({
          data,
          pagination: {
            currentPage: page,
            totalPages,
            totalRecords: total,
            limit
          }
        });
      }
    );
  });
});

// Get student details
app.get('/api/students/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM registrations WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching student:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(results[0]);
  });
});

// Update student status
app.put('/api/students/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, followup_date, notes } = req.body;

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  let query = 'UPDATE registrations SET status = ?, notes = ?';
  let params = [status, notes || ''];

  if (status === 'Follow up' || status === 'Future follow up') {
    query += ', followup_date = ?';
    params.push(followup_date || null);
  } else {
    query += ', followup_date = NULL';
  }

  query += ' WHERE id = ?';
  params.push(id);

  db.query(query, params, (err) => {
    if (err) {
      console.error('Error updating student status:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ success: true, message: 'Status and notes updated successfully' });
  });
});

// Notification list
app.get('/api/notifications', (req, res) => {
  const todayStr = new Date().toISOString().slice(0, 10);

  const query = `
    SELECT id, name, status, followup_date 
    FROM registrations 
    WHERE (status = 'Follow up' OR status = 'Future follow up') 
      AND followup_date IS NOT NULL
      AND followup_date >= ?
    ORDER BY followup_date ASC
  `;

  db.query(query, [todayStr], (err, results) => {
    if (err) {
      console.error('Error fetching notifications:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');

    res.json(results);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database running on ${process.env.DB_PORT || 3306}`);
});
