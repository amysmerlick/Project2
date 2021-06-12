const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, (req, res)=> {
    console.log("this works")
})

module.exports = router;