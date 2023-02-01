/**
 * http://usejsdoc.org/
 */
const mssql = require("mssql");
const {dbConfig} = require('./dbConfig');

const pool = new mssql.ConnectionPool(dbConfig).connect()
	.then(pool => {console.log('create poool!!');return pool})
	.catch(err => { console.log('pool taken error : ', err)
});

module.exports = {mssql, pool};