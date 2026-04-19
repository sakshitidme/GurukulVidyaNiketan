const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            return res.status(500).json({ success: false, message: 'Server misconfiguration: admin credentials not set.' });
        }

        // Check email first
        if (username !== adminEmail) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare password — supports both plain-text (legacy) and bcrypt hashes
        let passwordMatch = false;
        if (adminPassword.startsWith('$2')) {
            passwordMatch = await bcrypt.compare(password, adminPassword);
        } else {
            passwordMatch = (password === adminPassword);
        }

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: 'admin-id', role: 'admin' },
            process.env.JWT_SECRET || 'gurukul-secret-key',
            { expiresIn: '1d' }
        );

        return res.json({
            success: true,
            message: 'Login successful',
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
