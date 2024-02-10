const router = (require('express')).Router();
const Blog = getModel('blog');

router.get('/list', async (req, res) => {
    res.json((await Blog.find()).map(b => {
        const { _id, __v, ...cleanedBlog } = b.toObject();
        return cleanedBlog;
    }));
});

router.get('/get/:slug', async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (blog) {
        const { _id, __v, ...cleanedBlog } = blog.toObject();
        res.json(cleanedBlog);
    } else {
        res.status(404).json({ error: 'Blog not found' });
    }
});

module.exports = router;
