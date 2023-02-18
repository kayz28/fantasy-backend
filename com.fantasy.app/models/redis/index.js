'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const RedisJSONClient = require('../../clients/redisClient');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = require('../../config/config.json')["redis"][env];
const db = {};

let redisOrm;
if (config.use_env_variable) {
  redisOrm = new RedisJSONClient(process.env[config.use_env_variable], config);
} else {
  redisOrm = new RedisJSONClient(config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const redisSchema = require(path.join(__dirname, file));
    redisSchema.name = file.slice(0, -9);
    db[redisSchema.name] = redisSchema;
  });

db.redisClient = redisOrm;

module.exports = db;
