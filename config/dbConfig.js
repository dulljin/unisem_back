/**
 * http://usejsdoc.org/
 */
const dbConfig = {
		server : '210.97.193.100',
		user : 'unisem_dev',
		password : 'seFa#6978!',
		database : 'USCS_DEV',
		port: 22454,
		options: {
			encrypt: true
		}
};

const secret = 'kEyOfUnIsEmScReAt';

module.exports = {dbConfig, secret};