const express = require("express");
const router = express.Router();

const users = [
    { id: 1, username: "admin", password: "1234" }
];

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    res.json({
        success: true,
        message: "Login successful",
        user: {
            id: user.id,
            username: user.username
        }
    });
});

module.exports = router;