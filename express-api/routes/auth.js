const User = getModel('user');
const router = (require('express')).Router();
const { verifyToken, isAdmin, sign } = require('../auth');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid username or password!"});
        }

        res.status(200).json({
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            },
            message: 'Successfully logged in!',
            token: sign({ username: user.username, role: user.role })
        });
    } catch (error) {
        res.status(500).json({ message: "Server error!" });
    }
});

router.post('/verify', verifyToken, (req, res) => {
    delete req.user.iat;
    res.status(200).json({ message: "Token is valid!", user: req.user });
});

router.get('/add-test-user', async (req, res) => {
    const username = 'admin';
    const email = 'admin@example.com';
    const password = 'adminPassword';
    const role = 'admin';
    
    const user = await User.findOne({ username });

    if (user) {
        return res.status(400).json({ message: "Test user already exists!" });
    }

    const newUser = new User({ username, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "Test user created!" });
});

module.exports = router;
