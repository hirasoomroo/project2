const router = require('express').Router();
const { Rating } = require('./models');
const withAuth = require('../../utils/auth');

//get comments
router.get('/', (req, res) => {
    Rating.findAll({})
    .then(dbRatingData =>res.json(dbRatingData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
)
//add new comments

router.post('/', withAuth, (req, res) => {
    if (req.session) {
      Rating.create({
        comment_text: req.body.comment_text,
        hiking_id: req.body.hiking_id,
        user_id: req.session.user_id,
      })
        .then(dbRatingData => res.json(dbRatingData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });
  
//delete comments

router.delete('/:id', withAuth, (req, res) => {
  Rating.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbRatingData => {
        if (!dbRatingData) {
          res.status(404).json({ message: 'No rating found with this id' });
          return;
        }
        res.json(dbRatingData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
