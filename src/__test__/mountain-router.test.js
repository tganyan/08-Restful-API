'use strict';

const superagent = require('superagent');
const server = require('../lib/server');

describe('api/mountains', () => {
  beforeAll(server.start);

  describe('testing post request', () => {
    test('should respond with 200 status code and a new json mountain', () => {
      return superagent.post('http://localhost:3000/api/mountains')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Pilchuck',
          elevation: '5,341′',
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('Pilchuck');
          expect(response.body.elevation).toEqual('5,341′');
          expect(response.body.id).toBeTruthy();
          expect(response.body.timestamp).toBeTruthy();
        });
    });
    test('should respond with 400 status code if there is no name', () => {
      return superagent.post('http://localhost:3000/api/mountains')
        .set('Content-Type', 'application/json')
        .send({
          elevation: '7600′',
        })
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(400);
        });
    });
  });

  describe('testing put request', () => {
    test('should respond with 200 status code and updated json mountain', () => {
      return superagent.put('http://localhost:3000/api/mountains')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Pilchuck YO!',
          elevation: '5,800′',
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('Pilchuck YO!');
          expect(response.body.elevation).toEqual('5,800');
        });
    });
  });

  describe('testing get methods', () => {
    test('should respond with 200 status code to verify that the route is valid', () => {
      return superagent.get('http://localhost:3000/api/mountains')
        .then((response) => {
          expect(response.status).toEqual(200);
        });
    });
    test('should respond with 200 status code to verify that the route and query are valid', () => {
      return superagent.get('http://localhost:3000/api/mountains?name=Pilchuck')
        .then((response) => {
          expect(response.status).toEqual(200);
        });
    });
  });

  describe('testing delete requests', () => {
    test('should respond with 200 status code and removed json mountain', () => {
      return superagent.delete('http://localhost:3000/api/mountains?name=Pilchuck')
        .set('Content-Type', 'application/json')
        .then((response) => {
          expect(response.status).toEqual(204);
        });
    });
  });
});
