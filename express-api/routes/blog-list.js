const router = (require('express')).Router();

router.get('/', (req, res) => {
    res.json([
        { id: 1, title: 'Blog 1' },
        { id: 2, title: 'Blog 2' },
        { id: 3, title: 'Blog 3' },
    ]);
});

module.exports = router;
