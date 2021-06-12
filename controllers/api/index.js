const router = require('express').Router();
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/project', projectRoutes);

module.exports = router;