const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {models} = require("../models");
const { validateJWT } = require("../middleware")
const { UniqueConstraintError } = require("sequelize");

router.get("/", validateJWT, (req, res) => {
  res.status(200).json({
    user: {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      username: req.user.username,
    },
  });
});

router.get("/:id", async (req, res) => {
  try {
    let user = await models.User.findByPk(req.params.id);

    let { id, username, firstName, lastName } = user;

    res.status(200).json({
      id,
      username,
      firstName,
      lastName,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    models.User.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        //compare password
        if (bcrypt.compareSync(password, user.password)) {
          //password matches
          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

          res.status(200).json({
            message: "User successfully logged in",
            token,
            user,
          });
        } else {
          //invalid password
          res.status(401).json({
            error: "Invalid username or password.",
          });
        }
      })
      .catch((err) => {
        //invalid username
        res.status(401).json({
          error: "Invalid username or password.",
        });
      });
  } catch (error) {
    res.status(500).json({ error });
  }

  try {
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/register", (req, res) => {
  const { username, password, email, firstName, lastName, isAdmin } = req.body;

  console.log(req.body);

  try {
    //validation
    if (
      !password.length >= 5 ||
      !username.length >= 4 ||
      !username.match(/[!@#$_0-9]/g) ||
      !email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
      )
    ) {
      res.status(400).json({
        message: "Data validation failed.",
      });
      return;
    }

    models.User.create({
      username,
      password: bcrypt.hashSync(password, 12),
      email,
      firstName,
      lastName,
      isAdmin
    })
      .then((user) => {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        res.status(201).json({
          message: "User successfully created.",
          token,
          user,
        });
      })
      .catch((err) => {
        if (typeof err === UniqueConstraintError) {
          res.status(401).json({
            message: "That email or username already exists.",
          });
        }

        res.status(401).json({ message: "Something went wrong." });
      });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
});

router.put('/makeadmin/:userId', async(req, res) => {
  const { userId } = req.params;
  const query = {
      where: {
          id: userId
      }
  };
  const user = await models.User.findOne({
      where: {
          id: userId
      }
  })
  const makeAdmin = {
      isAdmin: true
  }
  try {
      const update = await models.User.update(makeAdmin, query);
      res.status(200).json({
          user: user.email,
          message: "user is now an admin"
      });
  } catch (err) {
      res.status(500).json({ error: err });
  }
})

router.put('/deleteadmin/:userId', async(req, res) => {
  const { userId } = req.params;
  const query = {
      where: {
          id: userId
      }
  };
  const user = await models.User.findOne({
      where: {
          id: userId
      }
  })
  const makeAdmin = {
      isAdmin: false
  }
  try {
      const update = await models.User.update(makeAdmin, query);
      res.status(200).json({
          user: user.email,
          message: "Admin User is now deleted"
      });
  } catch (err) {
      res.status(500).json({ error: err });
  }
})
  
  module.exports = router;
  