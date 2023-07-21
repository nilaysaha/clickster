'use strict'
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

class DB {
    constructor() {
        //this.connection_string = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
        this.connection_string = 'postgres://hamnusli:qJ9UUkbou_GKkdwRdV7xm_g-mbNuhO5Q@heffalump.db.elephantsql.com/hamnusli'
    }

    connect(connectionString){
        console.log('----------------TRYING TO CONNECT TO POSTGRES--------------------------\n')
        console.log(this.connection_string)
        
        return new Sequelize(this.connection_string, {logging: console.log, pool:{
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }});
    }
}


module.exports = {
    DB
}
