'use strict';

const url = require('url');
const queryString = require('querystring');
const logger = require('./logger');

const requestParser = module.exports = {};

/**
 *
 * @param request
 * @returns {Promise<any>}
 */
requestParser.parseASYNC = (request) => {
  return new Promise((resolve, reject) => {
    logger.log(logger.INFO, `Original URL: ${request.url}`);

    request.url = url.parse(request.url);

    request.url.query = queryString.parse(request.url.query);

    if (request.method !== 'POST' && request.method !== 'PUT') {
      return resolve(request);
    }

    let fullBody = '';

    request.on('data', (buffer) => {
      fullBody += buffer.toString();
    });

    request.on('end', () => {
      try {
        request.body = JSON.parse(fullBody);
        return resolve(request);
      } catch (error) {
        return reject(error);
      }
    });
    return undefined;
  });
};
