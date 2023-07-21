"use strict"

const fastify = require("fastify");
const swagger = require('@fastify/swagger');
const { proutes } = require("./asset");

const service = (options = {}) => {
    const app = fastify(options);
    
    app.register(proutes);

    // app.register(swagger,
    //              {
    //                  routePrefix: '/asset/apidoc',
    //                  mode: 'static',
    //                  specification: {
    //                      path: './apiDocs/asset.json'
    //                  },
    //                  exposeRoute: true
    //              }
    //             )
    
    return app;
};

module.exports = service;
