const app = require('express')();
const PORT = process.env.PORT || 3001;

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

app.use('/blog-list', require('./routes/blog-list'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
