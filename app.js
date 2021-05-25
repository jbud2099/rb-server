require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");
const controllers = require("./controllers");
//const middlewares = require("./middleware");

app.use(Express.json());
//app.use(middlewares.CORS);
app.use(require("./middleware/headers"))

app.use("/review", controllers.Review);
app.use("/user", controllers.User);
app.use("/favorite", controllers.Favorite);


dbConnection.authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed due to ${err}`);
  });

// app.listen(3000, () => {
//     console.log(`[Server]: App is listening on 3000.`)
// })