const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

// ================= MySQL CONFIG =================
const dbConfig = {
    host: "localhost",
    user: "root",        // your MySQL username
    password: "harianu23@27", // your MySQL password
    database: "safario"
};

// ================= REGISTER =================
app.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const conn = await mysql.createConnection(dbConfig);

        // Check if user exists
        const [existing] = await conn.execute("SELECT * FROM users WHERE email=?", [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password and insert new user
        const hashedPassword = await bcrypt.hash(password, 10);
        await conn.execute(
            "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
            [firstName, lastName, email, hashedPassword]
        );

        res.json({ message: "Account created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    try {
        const conn = await mysql.createConnection(dbConfig);
        const [users] = await conn.execute("SELECT * FROM users WHERE email=?", [email]);

        if (users.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = users[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({ message: "Login successful", user_id: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// ================= FETCH TRAVEL BUDDIES =================
app.get("/buddies/:user_id", async (req, res) => {
    const userId = req.params.user_id;

    try {
        const conn = await mysql.createConnection(dbConfig);

        // Get user's trips
        const [trips] = await conn.execute("SELECT * FROM trips WHERE user_id=?", [userId]);
        if (trips.length === 0) return res.json({ buddies: [] });

        const userTrip = trips[0];

        // Find other users going to the same destination during overlapping dates
        const [buddies] = await conn.execute(
            `SELECT u.id, u.first_name, u.last_name, u.travel_style, u.interests, t.destination, t.start_date, t.end_date
             FROM users u
             JOIN trips t ON u.id = t.user_id
             WHERE t.destination=? AND u.id != ? 
               AND t.start_date <= ? AND t.end_date >= ?`,
            [userTrip.destination, userId, userTrip.end_date, userTrip.start_date]
        );

        res.json({ buddies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// ================= SEND TRAVEL REQUEST =================
app.post("/request", async (req, res) => {
    const { sender_id, receiver_id, trip_id } = req.body;

    if (!sender_id || !receiver_id || !trip_id) {
        return res.status(400).json({ message: "All fields required" });
    }

    try {
        const conn = await mysql.createConnection(dbConfig);

        await conn.execute(
            "INSERT INTO travel_requests (sender_id, receiver_id, trip_id) VALUES (?, ?, ?)",
            [sender_id, receiver_id, trip_id]
        );

        res.json({ message: "Request sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// ================= SERVER =================
app.listen(5000, () => console.log("Server running on port 5000"));
