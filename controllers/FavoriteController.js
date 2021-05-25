const Express = require("express");
const {models}  = require("../models")
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");


router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
});



router.post("/", validateJWT, async (req, res) => {
    const {
      game: game,
      yes: yes,
      no: no,
    } = req.body;
  
    // if (req.user.id !== owner_id) {
    //   return res.status(403).json({
    //     message: "You cannot create an entry for another user.",
    //   });
    // }
  
    console.log(game, yes, no);
    try {
      const Favorite = await models.Favorite.create({
        game,
        yes,
        no,
      });
      res.status(201).json({
        message: "Added to the list!",
        Favorite,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Failed to create entry ${err}`,
      });
    }
  });


  router.post('/played', async (req, res) => {
    console.log('gamelist');
    const {id} = req.body;
    try {
      const playedList = await models.Favorite.findAll(
        {yes: true, no: false},
        {where: {id: id}, returning: true})
      res.status(200).json(playedList);
    } catch(err){
      console.log(err);
      res.status(500).json({ error: err })
    }
  
  })
// router.get("/", async (req, res) => {
//     const { userId } = req.body;
//     try {
//       const favoriteUser = await Favorite.findAll({
//         where: {
//           userId: userId,
//         },
//       });
//       res.status(200).json(favoriteUser);
//     } catch (err) {
//       res.status(500).json({ error: err });
//     }
//   });

//   router.post('/favorite', async (req, res) => {
//     const {yes, no} = req.body;

//     try {
//       const Favorite = await Favorite.create({
//             yes: yes,
//             no: no,
        
//         })
//         
//            
//                 res.status(201).json({
//                     Favorite,
//                     message: 'favorite created'
//                 });
//             
//         
//     } catch (err) {
//         res.status(500).json({
//             error: `Failed to create comment: ${err}`
//         })
//     }
// })

module.exports = router;