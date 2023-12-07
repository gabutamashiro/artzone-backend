const authRoutes = require("./auth");
const userRoutes = require("./users");
const followerRoutes = require("./followers");
const notificationRoutes = require("./notifications");
const postRoutes = require("./posts");
const searchRoutes = require("./search");
const reactionRoutes = require("./reactions");
const commentRoutes = require("./comments");
const productRoutes = require("./products");
const orderRoutes = require("./orders");

module.exports = function ({ app, dbConn, upload }) {
  authRoutes({ app, dbConn });
  userRoutes({ app, dbConn, upload });
  followerRoutes({ app, dbConn });
  notificationRoutes({ app, dbConn });
  postRoutes({ app, dbConn, upload });
  searchRoutes({ app, dbConn, upload });
  reactionRoutes({ app, dbConn });
  commentRoutes({ app, dbConn, upload });
  productRoutes({ app, dbConn, upload });
  orderRoutes({ app, dbConn, upload });
};