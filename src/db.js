'use strict'
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

class DB {
    constructor() {
        this.connection_string = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
    }

    connect(connectionString){
        return new Sequelize(this.connection_string, {logging: console.log, pool:{
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }});
    }
}
