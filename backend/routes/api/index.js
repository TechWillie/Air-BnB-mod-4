// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require("./spots.js")
const reviewsRouter = require("./reviews.js")
const bookingsRouter = require("./bookings.js")
const imagesRouter = require('./images.js');


const { restoreUser } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
// // GET /api/set-token-cookie
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });
            
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter)

router.use('/reviews', reviewsRouter)

router.use('/bookings', bookingsRouter)

router.use('/images', imagesRouter);

// router.get('/', (req, res) => {
//     const user = User.getAll()
//     res.status(200).json(user)
// })

router.post('/test', function(req, res) {
    // desturcture the firstname and lastanme from req.body
    const { firstName, lastName } = req.body;

    res.json({ requestBody: req.body,
        firstName: firstName || 'Unknown',
        lastName: lastName || 'Unknown'
     });
    });
            // // GET /api/require-auth
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router;