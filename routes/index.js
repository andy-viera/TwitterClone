const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const homeRoutes = require("./homeRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  app.use("/", userRoutes);
  app.use("/", homeRoutes);
};
