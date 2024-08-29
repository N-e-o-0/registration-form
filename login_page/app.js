const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fuckoff',
    database: 'mydb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('views'));

// Route for login
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.send('Invalid username or password');
        }
    });
});

// Route for registration
app.post('/register', (req, res) => {
    const fullname = req.body.fullname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const query = 'INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [fullname, username, email, password], (err, results) => {
        if (err) throw err;
        res.send('Registration successful');
    });
});

// Start server
app.listen(port, () => {~
    console.log(`Server running at http://localhost:${port}/`);
});
