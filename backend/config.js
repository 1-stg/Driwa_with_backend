require('dotenv').config();

module.exports = {
  accessSecret: process.env.ACCESS_SECRET,
  refreshSecret: process.env.REFRESH_SECRET,
  port: process.env.PORT || 3005,
  nodeEnv: process.env.NODE_ENV || 'development'
};