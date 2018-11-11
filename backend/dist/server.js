"use strict";
exports.__esModule = true;
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var fs = require("fs");
var https = require("https");
var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
// midlleware para login
server.post('/login', auth_1.handleAuthentication);
//use serve para todos os verbos 
server.use('/orders', authz_1.handleAuthorization);
// Use default router
server.use(router);
var options = {
    cert: fs.readFileSync('./backend/Keys/cert.pem'),
    key: fs.readFileSync('./backend/Keys/key.pem')
};
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running on https://localhost:3001');
});
