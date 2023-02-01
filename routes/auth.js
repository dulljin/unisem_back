/**
 *  사용자 인증 router
 */
var express = require('express');
var jwt = require('jsonwebtoken');
const {mssql, pool} = require('../config/dbPool');
let {querySet} = require('../config/sqlFactory');

var router = express.Router();

router.post('/login', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('userId', req.body.userId);
		
		var query = querySet.selectLogin;
		
		console.log(query);
		const result = await dbReq.query(query);
		
		let isLogin = false;
		if (result.recordset.length > 0) {
			var tempPw = result.recordset[0].user_pwd;
			//todo 암호화 단계 추가 필요
			delete result.recordset[0].user_pwd;
			if (req.body.userPw == tempPw) {
				isLogin = true;
			} 
		} 

		//result.recordset[0].isSuccess = isSuccess;
		if (isLogin) {
			if (result.recordset[0].user_tokenid == null) { //사용자 토큰 없을 시 임시 토큰 생성
				const secret = req.app.get('jwt-secret');
				var token = jwt.sign({
					_id: result.recordset[0].user_id,
					_usernm: result.recordset[0].user_name
				}, secret);
				result.recordset[0].user_tokenid = token;
			}
			res.status(200);
		} else { //로그인 실패
			res.status(401);
		}

		console.log(result.recordset[0]);
		var data = result.recordset[0];
		//var resObj = result.recordset[0];
		res.json({isLogin, data});
	} catch (err) {
		res.status(500);		
		res.json({isLogin: false, message: err.message});
	}
}); 

module.exports = router;