const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: "Authorization token not found!" });
    }

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
        req.user = decoded;
        next();
    });
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    return res.status(403).json({ message: "Forbidden!" });
}

const sign = (payload) => {
    return jwt.sign(payload, 'secretkey');
}

module.exports = {
    sign,
    isAdmin,
    verifyToken
}