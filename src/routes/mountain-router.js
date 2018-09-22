'use strict';

const Mountain = require('../model/mountains');
const app = require('../lib/router');
const logger = require('../lib/logger');

const mountainStash = [];

const sendStatus = (statusCode, message, response) => {
  logger.log(logger.INFO, `Responding with a ${statusCode} status code due to ${message}`);
  response.writeHead(statusCode);
  response.end();
}

const sendJSON = (statusCode, data, response) => {
  logger.log(logger.INFO, `Responding with a ${statusCode} status and the following data`);
  logger.log(logger.INFO, JSON.stringify(data));

  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(data));
  response.end();
};

app.post('/api/mountains', (request, response) => {
  if (!request.body) {
    sendStatus(400, 'body not found', response);
    return undefined;
  }

  if (!request.body.name) {
    sendStatus(400, 'that name is not found', response);
    return undefined;
  }

  if (!request.body.elevation) {
    sendStatus(400, 'elevation is not found', response);
    return undefined;
  }

  const mountain = new Mountain(request.body.name, request.body.elevation);
  mountainStash.push(mountain);
  sendJSON(200, mountain, response);
  return undefined;
});

app.get('/api/mountains', (request, response) => {
  sendStatus(200, 'The path is valid', response);
  return undefined;
});

app.delete('/api/mountains', (request, response) => {
  // if (!request.url.query) {
  //   sendStatus(400, 'body not found', response);
  //   return undefined;
  // }

  mountainStash.splice(mountainStash.indexOf(request.url.query(request)), 1);

  sendStatus(204, `${request.url.query(request)} has been removed`, response);
  return undefined;
});

app.put('/api/mountains', (request, response) => {
  if (!request.body.id) {
    sendStatus(400, 'body not found', response);
    return undefined;
  }

  if (request.body.name) {
    mountainStash[mountainStash.indexOf(request.body.id)].body.name = request.body.name;
  }

  if (request.body.elevation) {
    mountainStash[mountainStash.indexOf(request.body.id)].body.elevation = request.body.elevation;
  }

  sendStatus(200, `${request.body.name} has been updated`, response);
  sendJSON(200, request, response);
  return undefined;
});
