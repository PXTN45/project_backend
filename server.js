const express = require("express");
const restaurantRouter = require("./routes/restaurant.router");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const sql = require("./models/db");
const db = require("./models/index");
const role = db.role;
// dev mode
// db.sequelize.sync({force:true}).then(() => {
//   console.log('Drop and resync DB');
//   initial();
// })

function initial() {
  role.create({
    id: 1,
    name: "user",
  });
  role.create({
    id: 2,
    name: "moderator",
  });
  role.create({
    id: 3,
    name: "admin",
  });
}

const PORT = 5000;

//create server
const app = express();
const notFoundMiddleware = require("./middleware/not-found.js");
const notFound = require("./middleware/not-found.js");
//user middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//swagger Doc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("<h1> this is a restaurant API </h1>");
});

app.use("/", restaurantRouter);
require("./routes/auth")(app);

app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log("server is running on http://localhost:" + PORT);
});
