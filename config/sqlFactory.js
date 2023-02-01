/**
 * 쿼리 xml 파싱
 */
var fs = require('fs');
var xml_digester = require('xml-digester');
var digester = xml_digester.XmlDigester({});

const xmlStr = fs.readFileSync(__dirname + '/sql/query.xml', 'utf8');
const commXmlStr = fs.readFileSync(__dirname + '/sql/commQuery.xml', 'utf8');
let querySet, commQuerySet;

(function() {
	digester.digest(xmlStr, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			querySet = result.query;
		}
	});

	digester.digest(commXmlStr, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			commQuerySet = result.query;
		}
	});
})();

module.exports = {querySet, commQuerySet};