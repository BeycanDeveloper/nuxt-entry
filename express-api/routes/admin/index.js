const router = (require('express')).Router();

router.use('/blog', require('./blog'));

module.exports = router;
