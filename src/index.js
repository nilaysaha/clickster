"use strict";

const { Asset, Category, Collection } = require('./model/asset')
const { config } = require("dotenv");
config();                                                                                                                                                                          

const server = require("./service")({
  logger: {
    level: "info",
  },
});

// server.setErrorHandler(function (error, request, reply) {
//   if (error) handleError(error, request, reply);
// });
                                  
const start = async () => {
    try {
        await server.listen({ port: process.env.APP_PORT, host: '0.0.0.0' });
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();

module.exports = server;
