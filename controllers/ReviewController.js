const router = require("express").Router();
const {models} = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.get("/practice", (req, res) => {
  res.send("Hey!! This is a practice route!!");
});

router.get("/", async (req, res) => {
  const { id } = req.body;
  try {
    const reviewUser = await models.Review.findAll({
      where: {
        id: id,
      },
  })
    res.status(200).json(reviewUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/all", async (req, res) => {
  try {
    const reviewUser = await models.Review.findAll()
    res.status(200).json(reviewUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/game", async (req, res) => {
  console.log("test");
  const { game_id } = req.body;
  try {
    const reviewGame = await models.Review.findAll({
      where: { game_id: game_id },
    });
    res.status(200).json(reviewGame);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post('/played', async (req, res) => {
  console.log('playedlist');
  const {id} = req.body;
  try {
    const playedGames = await models.Review.findAll(
      {favorite: true, played: false},
      {where: {id: id}, returning: true})
    res.status(200).json(playedGames);
  } catch(err){
    console.log(err);
    res.status(500).json({ error: err })
  }

})

router.post('/similar',  async (req, res) => {
  const { game_id } = req.body;
  try {
    const reviewGame = await models.Review.findAll({
      where: { game_id: game_id },
    });
    res.status(200).json(reviewGame);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
})

router.post("/post", validateJWT, async (req, res) => {
  const {
    review: review,
    rating: rating,
    genre: genre,
    played: played,
    
  } = req.body;

  // if (req.user.id !== owner_id) {
  //   return res.status(403).json({
  //     message: "You cannot create an entry for another user.",
  //   });
  // }

  console.log(review, rating, genre, played);
  try {
    const Reviews = await models.Review.create({
      review,
      rating,
      genre,
      played,
      userId: req.user.id
      // game_id,
    });
    res.status(201).json({
      message: "Game Review created",
      Reviews,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Failed to create entry ${err}`,
    });
  }
});

router.put("/", validateJWT, async (req, res) => {
  const { review, rating, genre, played, id } = req.body;
  try {
    await models.Review.update(
      { review, rating, genre, played },
      { where: { id: id }, returning: true }
    ).then((result) => {
      res.status(200).json({
        message: "Review successfully updated",
        updatedReview: result,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update review: ${err}`,
    });
  }
});

router.delete("/", validateJWT, async (req, res) => {
  const { id } = req.body;
  try {
    const query = {
      where: {
        id: id,
      },
    };
    await models.Review.destroy(query);
    res.status(200).json({ message: "Review removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed Task" });
  }
});

module.exports = router;