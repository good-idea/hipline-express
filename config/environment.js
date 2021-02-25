const dotenv = require('dotenv').config()

const config = {
  // the host & port to connect to the CMS
  CMS_HOST: process.env.CMS_HOST || 'panel.myhipline.com',
  CMS_PORT: process.env.CMS_PORT || 80,
  // The port that express runs on
  PORT: process.env.PORT || 3000,
  ENV: process.env.ENV || 'production',
  // Allow a .env file to override any of the above
  ...dotenv.parsed,
}

module.exports = config
