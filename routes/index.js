const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");
const pageRoutes = require("./pageRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  app.use("/", userRoutes);
  app.use("/", tweetRoutes);
  app.use("/", pageRoutes);
};
