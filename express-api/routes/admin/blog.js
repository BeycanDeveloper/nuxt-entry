const router = (require('express')).Router();
const Blog = getModel('blog');

router.get('/list', async (req, res) => {
    res.json((await Blog.find()));
});

const createSlug = (title) => {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

router.post('/add', (req, res) => {
    try {
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            username: req.user.username,
            slug: createSlug(req.body.title)
        });
        blog.save();
        res.json({ message: 'Blog added' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
