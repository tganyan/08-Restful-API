'use strict';

const http = require('http');
const logger = require('./logger');
const router = require('./router');
require('../routes/mountain-router');

const app = http.createServer(router.findAndExecuteRoutes);

const server = module.exports = {};

/**
 *
 * @param port 3000
 * @returns {*|void}
 */

server.start = (port = 3000) => {
  return app.listen(port, () => {
    logger.log(logger.INFO, `Server is on at PORT: ${port}`);
  });
};

// server.stop(() => {
//   logger.log(logger.INFO, 'Server is off');
//   process.exit();
// });
