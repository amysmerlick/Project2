const router = require('express').Router();
const { Item, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all items and JOIN with user data
    const itemData = await Item.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const items = itemData.map((item) => item.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      items, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/item/:id', async (req, res) => {
  try {
    const itemData = await Item.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const item = itemData.get({ plain: true });

    res.render('item', {
      ...item,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', (req, res) => {
  // try {
  //   const itemData = await Item.findByPk(req.params.id, {
  //     include: [
  //       {
  //         model: User,
  //         attributes: ['name'],
  //       },
  //     ],
  //   });

  //   const item = itemData.get({ plain: true });

  //   res.render('item', {
  //     ...item,
  //     logged_in: req.session.logged_in
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  console.log("this work")
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Item }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;