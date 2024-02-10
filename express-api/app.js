const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const { verifyToken, isAdmin } = require('./auth');

// create app
const app = express();

const path = require('path');
global.getModel = (modelName) => {
    return require(path.join(__dirname, 'models', modelName));
}

// middleware
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(bodyParser.json());

// includes
const config = require('./config');

app.use((req, res, next) => {
    config.db.then(() => {
        next();
    })
    .catch(err => {
        res.status(500).json({
            message: 'Failed to connect to the database',
            error: err
        });
    });
})

app.get('/', (req, res) => {
    res.send('Welcome to the Express API');
});

app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));

app.use('/admin', verifyToken, isAdmin, require('./routes/admin/index'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
