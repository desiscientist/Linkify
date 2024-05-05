const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

//express configuaration
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

const linksRouter = require("./routes/links");
app.use("/links", linksRouter);

const analyticsRouter = require("./routes/analytics");
app.use("/analytics", analyticsRouter);

module.exports = app;





// Rest API -> RESTful api - Stateless 