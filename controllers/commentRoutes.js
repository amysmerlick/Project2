const router = require('express').Router();
const { Comment } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', (req, res) => {
//     Comment.findAll({})
//       .then(dbCommentData => res.json(dbCommentData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// });

router.post('/', withAuth, (req, res) => {
    console.log(req.body)
    console.log(req.session)
  // check the session
  if (req.session) {
    Comment.create({
      comment_content: req.body.comment_content,
      item_id: req.body.item_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then(dbCommentData => res.redirect(`/post/${req.body.item_id}`))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// router.delete('/:id', withAuth, (req, res) => {
//     Comment.destroy({
//         where: {
//           id: req.params.id
//         }
//       })
//         .then(dbCommentData => {
//           if (!dbCommentData) {
//             res.status(404).json({ message: 'No comment found with this id' });
//             return;
//           }
//           res.json(dbCommentData);
//         })
//         .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//         });
// });

module.exports = router;