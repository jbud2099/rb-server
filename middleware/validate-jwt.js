require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

/* For the validate session, we'd basically used this code that was structured from our previous validate session used
in our pieServer and the workoutLogServer.
For the validate session, it's pretty much for the user to login/signup with the token.
All of the coding inside this file is to help find the User with the token and authorization.*/
const validateJWT = async (req, res, next) => {
  if (req.method == "OPTIONS") { // For this line it determines if it is safe to send.
    // console.log("hello");
    next(); //next() helps passes control to the next middleware function.
  } else if (
    req.headers.authorization &&
    req.headers.authorization.includes("Bearer")
  ) {
    const { authorization } = req.headers;
    // console.log("authorization -->", authorization);
    try {
      const payload = authorization 
        ? jwt.verify(
            authorization.includes("Bearer") //From line 22 to 27 it determines whether the payload would be a token,
              ? authorization.split(" ")[1] // or to be undefined.
              : authorization,
            process.env.JWT_SECRET
          )
        : undefined;

      // console.log("payload -->", payload);
      if (payload) { //For the payload we would use the findOne method to look for the User's ID in the UserModel.
        let foundUser = await User.findOne({ where: { id: payload.id } });
        // foundUser helps locate the User.
        if (foundUser) { // This helps check if the value of foundUser is true.
          // console.log("request -->". req);
          req.user = foundUser;
          next();
        } else {
          res.status(400).send({ message: "Not Authorized" });
        }
      } else {
        res.status(401).send({ message: "Invalid token" });
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Error with the token" });
    }
  } else {
    res.status(403).send({ message: "Forbidden" });
  }
};

module.exports = validateJWT;
