var express = require('express');
const {mssql, pool} = require('../config/dbPool');
const {querySet, commQuerySet} = require('../config/sqlFactory');
const authApi = require('./middlewares/apiAuth');

var router = express.Router();

router.post('/join-confirm', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();

		dbReq.input('USER_TOKEN', mssql.NVarChar, null);
		//dbReq.input('USER_PHOTO', null);
		dbReq.input('USER_ID', mssql.VarChar, req.body.USER_ID);
		dbReq.input('USER_PWD', mssql.VarChar, req.body.USER_PWD);
		dbReq.input('USER_TEAM_CODE', mssql.VarChar, req.body.USER_TEAM_CODE);
		dbReq.input('USER_RESIGN_STATUS', mssql.Int, req.body.USER_RESIGN_STATUS);
		dbReq.input('USER_GROUP_CODE', mssql.VarChar, req.body.USER_GROUP_CODE);
		dbReq.input('USER_NAME', mssql.NVarChar, req.body.USER_NAME);
		dbReq.input('USER_POSITION_CODE', mssql.VarChar, req.body.USER_POSITION_CODE);
		dbReq.input('USER_SITE_DUTY_CODE', mssql.VarChar, req.body.USER_SITE_DUTY_CODE);
		dbReq.input('USER_DUTY_CODE', mssql.VarChar, req.body.USER_DUTY_CODE);
		dbReq.input('USER_OFFICE_NO', mssql.VarChar, req.body.USER_OFFICE_NO);
		dbReq.input('USER_SECURITY_NO', mssql.VarChar, req.body.USER_SECURITY_NO);
		dbReq.input('USER_AGE', mssql.Int, req.body.USER_AGE);
		dbReq.input('USER_HP', mssql.VarChar, req.body.USER_HP);
		dbReq.input('USER_BIRTH_DAY', mssql.VarChar, req.body.USER_BIRTH_DAY);
		dbReq.input('USER_JOIN_DAY',req.body.USER_JOIN_DAY);
		dbReq.input('USER_YEAR_COUNT', mssql.Int, req.body.USER_YEAR_COUNT);
		dbReq.input('USER_EDU_GRADE', mssql.NVarChar, req.body.USER_EDU_GRADE);
		dbReq.input('USER_EDU_DIVISION', mssql.NVarChar, req.body.USER_EDU_DIVISION);
		dbReq.input('USER_EDU_MAJOR', mssql.NVarChar, req.body.USER_EDU_MAJOR);
		dbReq.input('USER_CHINA_NAME', mssql.NVarChar, req.body.USER_CHINA_NAME);
		dbReq.input('USER_ADDRESS', mssql.NVarChar, req.body.USER_ADDRESS);
		dbReq.input('USER_FAMILY_REGISTER', mssql.NVarChar, req.body.USER_FAMILY_REGISTER);
		dbReq.input('USER_EMAIL', mssql.VarChar, req.body.USER_EMAIL);
		dbReq.input('USER_ENG_NAME', mssql.VarChar, req.body.USER_ENG_NAME);
		dbReq.input('USER_LICENSE', mssql.NVarChar, req.body.USER_LICENSE);
		dbReq.input('USER_RESIGN_DAY',req.body.USER_RESIGN_DAY);
		dbReq.input('USER_MARRY_DAY',req.body.USER_MARRY_DAY);
		dbReq.input('USER_HOME_ADDRESS', mssql.NVarChar, req.body.USER_HOME_ADDRESS);
		dbReq.input('USER_COMPANY', mssql.NVarChar, req.body.USER_COMPANY);
		dbReq.input('USER_CAR_TYPE', mssql.NVarChar, req.body.USER_CAR_TYPE);
		dbReq.input('USER_CAR_MODEL', mssql.NVarChar, req.body.USER_CAR_MODEL);
		dbReq.input('USER_CAR_NO', mssql.NVarChar, req.body.USER_CAR_NO);
		dbReq.input('USER_CAR_COLOR', mssql.NVarChar, req.body.USER_CAR_COLOR);
		dbReq.input('USER_COMPANY_HOUSE_NAME', mssql.NVarChar, req.body.USER_COMPANY_HOUSE_NAME);
		dbReq.input('USER_COMPANY_HOUSE', mssql.NVarChar, req.body.USER_COMPANY_HOUSE);
		dbReq.input('USER_COMPANY_HOUSE_NO', mssql.NVarChar, req.body.USER_COMPANY_HOUSE_NO);
		//dbReq.input('USER_CONFIRM1_ID', mssql.NVarChar, req.body.USER_CONFIRM1_ID);
		//dbReq.input('USER_CONFIRM2_ID', mssql.NVarChar, req.body.USER_CONFIRM2_ID);
		dbReq.input('USER_LEVEL', mssql.Int, req.body.USER_LEVEL);
		dbReq.input('USER_REMAIN_HOLYDAY', mssql.Int, req.body.USER_REMAIN_HOLYDAY);
		dbReq.input('USER_TOTAL_HOLYDAY', mssql.Int, req.body.USER_TOTAL_HOLYDAY);
		dbReq.input('USER_ADMIN_ID', mssql.VarChar, req.body.USER_ADMIN_ID);
		dbReq.input('USER_FROM', req.body.USER_FROM);

		dbReq.execute('usp_user_register').then(result => {
			var resObj = new Object();
			resObj.isSuccess = true;
			resObj.message = "confirm Ok!";
			console.log(result);
			res.json(resObj);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
	} catch (err) {
		console.log(err.message);
		res.status(500);
		var resObj = new Object();
		resObj.isSuccess = false;
		resObj.message = err.message;
		res.send(err.message);
	}
});

router.use(authApi);

router.post('/user-info-detail', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('userId', String(req.body.userId));

		var query = querySet.selectUserInfo;
		const result = await dbReq.query(query);

		//필요없는 리턴 필드 제거
		delete result.recordset[0].USER_PHOTO;
		//delete result.recordset[0].USER_PWD;
		//delete result.recordset[0].USER_TOKENID;
		console.log(result);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/put-team-code', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('USER_FROM', Number(req.body.userFrom));
		dbReq.input('WORK_PLACE_CODE', String(req.body.placeCd));
		dbReq.input('WORK_PART_CODE', String(req.body.partCd));
		dbReq.input('WORK_COMPLEX_CODE', String(req.body.complexCd));
		dbReq.input('WORK_LINE_CODE', String(req.body.lineCd));
		dbReq.input('WORK_TEAM_CODE', String(req.body.teamCd));
		dbReq.input('WORK_TEAM_NAME', String(req.body.teamNm));
		dbReq.input('TEAM_EQP_TYPE', mssql.Int, req.body.eqpType);
		dbReq.input('USER_ID', String(req.body.userId));

		dbReq.execute('usp_team_regiser').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
		
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/put-group-code', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('USER_FROM', Number(req.body.userFrom));
		dbReq.input('WORK_TEAM_CODE', String(req.body.teamCd));
		dbReq.input('WORK_GROUP_CODE', String(req.body.groupCd));
		dbReq.input('WORK_GROUP_NAME', String(req.body.groupNm));
		dbReq.input('TEAM_EQP_TYPE', mssql.Int, req.body.eqpType);
		dbReq.input('USER_ID', String(req.body.userId));

		dbReq.execute('usp_group_register').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
		
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/proc-position-code', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('posCode', String(req.body.posCode));
		dbReq.input('posName', String(req.body.posName));
		dbReq.input('modUserId', String(req.body.modUserId));
		dbReq.input('modTime', null);
		dbReq.input('cdUpdateVer', String(req.body.cdUpdateVer));
		//dbReq.output();
		dbReq.execute('put_position_code').then(result => {
			console.log(result);
			res.json(result);
		});
		
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/proc-duty-code', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('dutyCode', String(req.body.dutyCode));
		dbReq.input('dutyName', String(req.body.dutyName));
		dbReq.input('modUserId', String(req.body.modUserId));
		dbReq.input('modTime', null);
		dbReq.input('cdUpdateVer', String(req.body.cdUpdateVer));
		//dbReq.output();
		dbReq.execute('put_duty_code').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		});
		
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/put-work-schedule', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		dbReq.input('USER_ID', mssql.VarChar, req.body.userId);
		dbReq.input('WORKING_START_DATE', mssql.DateTime, req.body.startDate);
		//var temp = req.body.startTime == null? "00:00:00":req.body.startTime;
		dbReq.input('WORKING_START_TIME', mssql.VarChar, req.body.startTime);
		dbReq.input('WORKING_END_DATE', mssql.DateTime, req.body.endDate);
		//temp = req.body.endTime == null? "00:00:00":req.body.endTime;
		dbReq.input('WORKING_END_TIME', mssql.VarChar, req.body.endTime);
		dbReq.input('nResult', '');

		var isGo = false; //요청 허용 검증
		await dbReq.execute('usp_Enable_Working_Plan_Verify').then (result => {
			console.log('check days : ' + result.recordset[0].Result);
			if (result.recordset[0].Result > 0) {
				isGo = true;
			} else {
				var obj = new Object();
				obj.isSuccess = false;
				obj.message = '근무 신청 시간 초과!';
				res.json(obj);
			}
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});

		// 기존 파라메터 삭제
		delete dbReq.parameters.WORKING_START_DATE;
		delete dbReq.parameters.WORKING_START_TIME;
		delete dbReq.parameters.WORKING_END_DATE;
		delete dbReq.parameters.WORKING_END_TIME;
		delete dbReq.parameters.nResult;

		dbReq.input('USER_FROM', mssql.Int, req.body.userFrom);
		dbReq.input('USER_WORKING_START_DATE', mssql.DateTime, req.body.startDate);
		dbReq.input('USER_WORKING_START_TIME', mssql.VarChar, req.body.startTime);
		dbReq.input('USER_WORKING_END_DATE', mssql.DateTime, req.body.endDate);
		dbReq.input('USER_WORKING_END_TIME', mssql.VarChar, req.body.endTime);
		if (req.body.workType != null) {
			dbReq.input('USER_WORKING_TYPE', mssql.Int, req.body.workType);
		}
		if (req.body.idx != null) {
			dbReq.input('IDX', mssql.Int, req.body.idx);
		}

		dbReq.execute('usp_user_working_register').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
	} catch(err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/put-event-check', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('USER_FROM', Number(req.body.userFrom));
		dbReq.input('EVENT_TITLE', String(req.body.title));
		dbReq.input('EVENT_CHECK_DAY', req.body.checkDay);
		if (req.body.placeCd != null && req.body.placeCd.length > 0) {
			dbReq.input('WORK_PLACE_CODE', req.body.placeCd);
		}
		dbReq.input('IS_WORK_PLACE_ALL_CHECK', Number(req.body.placeAll));

		if (req.body.partCd != null && req.body.partCd.length > 0) {
			dbReq.input('WORK_PART_CODE', req.body.partCd);
		}
		dbReq.input('IS_WORK_PART_ALL_CHECK', Number(req.body.partAll));

		if (req.body.complexCd != null && req.body.complexCd.length > 0) {
			dbReq.input('WORK_COMPLEX_CODE', req.body.complexCd);
		}
		dbReq.input('IS_WORK_COMPLEX_ALL_CHECK', Number(req.body.complexAll));

		if (req.body.lineCd != null && req.body.lineCd.length > 0) {
			dbReq.input('WORK_LINE_CODE', req.body.lineCd);
		}
		dbReq.input('EVENT_STATUS', String(req.body.status));
		dbReq.input('USER_ID', String(req.body.userId));

		dbReq.execute('usp_eqp_event_check_register').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});

	} catch(err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/put-eventcheck-info', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('IDX', String(req.body.idx));
		dbReq.input('EVENT_NOTE', String(req.body.note));

		dbReq.execute('usp_eqp_event_supervisor_update').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
		
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/event-check-complete', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('EVENT_CODE', String(req.body.eventCode));
		dbReq.input('EVENT_STATUS', Number(req.body.eventStatus));

		dbReq.execute('usp_eqp_event_update_status').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/put-wrs-work', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('USER_ID', String(req.body.userId));
		dbReq.input('WRS_CODE', String(req.body.wrsCode));
		dbReq.input('WRS_REQUEST_PART', String(req.body.wrsReqPart));
		dbReq.input('WRS_FAULT_TYPE', String(req.body.wrsFaultType));
		dbReq.input('WRS_REQUEST_REASON', String(req.body.wrsReqReason));
		//dbReq.input('WRS_LINE', String(req.body.wrsLine));
		//dbReq.input('WRS_PROCESS', String(req.body.wrsProcess));
		dbReq.input('WRS_EQP_ID', String(req.body.wrsEqpId));
		dbReq.input('WRS_EQP_SN', String(req.body.wrsEqpSn));
		//dbReq.input('WRS_CHAMBER_NAME', String(req.body.wrsChamberNm));
		dbReq.input('WRS_REQ_TITLE', String(req.body.wrsTitle));
		dbReq.input('WRS_WORK_PERSON_NAME', String(req.body.wrsWorkerName));
		//dbReq.input('WRS_REQ_DAY', String(req.body.wrsReqDay));
		//dbReq.input('WRS_EXPECT_DAY', String(req.body.wrsExpectDay));

		var callName = "";
		if (req.body.workCode != null) {
			callName = "usp_wrs_update";
			dbReq.input('WORK_CODE', String(req.body.workCode));
		} else {
			callName = "usp_wrs_register";
		}

		dbReq.execute(callName).then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/ot-confirm', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('USER_FROM', Number(req.body.userFrom));
		dbReq.input('IDX', Number(req.body.idx));
		dbReq.input('USER_ID', String(req.body.userId));
		dbReq.input('REQ_DATE', String(req.body.reqDate));
		dbReq.input('OT_TIME', Number(req.body.otTime));
		dbReq.input('WORK_COMMENT', String(req.body.comment));

		dbReq.execute('usp_user_ot_register').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/put-wrs-account', async (req, res) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('WORK_CODE', String(req.body.WORK_CODE));
		//dbReq.input('WORK_NO', Number(req.body.WORK_NO));
		dbReq.input('WORK_PLACE_NAME', mssql.NVarChar, req.body.WORK_PLACE_NAME);
		dbReq.input('WORK_SITE_NAME', mssql.NVarChar, req.body.WORK_SITE_NAME);
		dbReq.input('WORK_COMPLEX_NAME', mssql.NVarChar, req.body.WORK_COMPLEX_NAME);
		dbReq.input('WORK_LINE_NAME', mssql.NVarChar, req.body.WORK_LINE_NAME);
		dbReq.input('EQP_WAFER_SIZE_NAME', mssql.NVarChar, req.body.EQP_WAFER_SIZE_NAME);
		dbReq.input('WORK_PART_NAME', mssql.NVarChar, req.body.WORK_PART_NAME);
		dbReq.input('WORK_PROCESS_NAME', mssql.NVarChar, req.body.WORK_PROCESS_NAME);
		dbReq.input('WORK_SUB_PROCESS_NAME', mssql.NVarChar, req.body.WORK_SUB_PROCESS_NAME);
		dbReq.input('SCR_SUB_PROC_PCS_NAME', mssql.NVarChar, req.body.SCR_SUB_PROC_PCS_NAME);
		dbReq.input('SCR_MODEL_NAME', mssql.NVarChar, req.body.SCR_MODEL_NAME);
		dbReq.input('SCR_CHAMBER_NAME', mssql.NVarChar, req.body.SCR_CHAMBER_NAME);
		dbReq.input('SCR_MAKER_NAME', mssql.NVarChar, req.body.SCR_MAKER_NAME);
		dbReq.input('EQP_TYPE_NAME', mssql.NVarChar, req.body.EQP_TYPE_NAME);
		dbReq.input('WRS_PREV_WORKING_DATE', mssql.DateTime, req.body.WRS_PREV_WORKING_DATE);
		dbReq.input('PART_CHANGE_DATE', mssql.DateTime, req.body.PART_CHANGE_DATE);
		dbReq.input('PART_USED_TERM', mssql.Int, req.body.PART_USED_TERM);
		dbReq.input('PART_NAME', mssql.NVarChar, req.body.PART_NAME);
		dbReq.input('PART_WARRANTY', mssql.Int, req.body.PART_WARRANTY);
		dbReq.input('PART_CHANGE_COUNT', mssql.Int, req.body.PART_CHANGE_COUNT);
		dbReq.input('THIS_YEAR_UNIT_PRICE', mssql.Int, req.body.THIS_YEAR_UNIT_PRICE);
		dbReq.input('PART_CURRENT_MONEY', mssql.VarChar, req.body.PART_CURRENT_MONEY);
		dbReq.input('PART_UNIT_PRICE', mssql.Real, req.body.PART_UNIT_PRICE);
		dbReq.input('PERSON_UNIT_PRICE', mssql.Real, req.body.PERSON_UNIT_PRICE);
		dbReq.input('TOTAL_PRICE', mssql.Real, req.body.TOTAL_PRICE);
		dbReq.input('PART_SECTION3', mssql.Int, req.body.PART_SECTION3);
		dbReq.input('NEW_UNIT_PRICE', mssql.Real, req.body.NEW_UNIT_PRICE);
		dbReq.input('OLD_UNIT_PRICE', mssql.Real, req.body.OLD_UNIT_PRICE);
		dbReq.input('DIFFERENCE_PRICE', mssql.Real, req.body.DIFFERENCE_PRICE);
		dbReq.input('PART_PRICE_UPDOWN', mssql.Int, req.body.PART_PRICE_UPDOWN);
		dbReq.input('IS_FIRST_FIXED_EQP', mssql.NVarChar, req.body.IS_FIRST_FIXED_EQP);
		dbReq.input('IS_REMODEL_EQP', mssql.NVarChar, req.body.IS_REMODEL_EQP);
		dbReq.input('IS_REMODEL_COUNT', mssql.Int, req.body.IS_REMODEL_COUNT);
		dbReq.input('WORK_DEVISION_PJT', mssql.NVarChar, req.body.WORK_DEVISION_PJT);
		dbReq.input('WORK_DEVISION_PJT_DETAIL', mssql.NVarChar, req.body.WORK_DEVISION_PJT_DETAIL);
		dbReq.input('WRS_WORKING_MONTH', mssql.NVarChar, req.body.WRS_WORKING_MONTH);
		dbReq.input('WRS_WORKING_START_TIME', mssql.DateTime, req.body.WRS_WORKING_START_TIME);
		dbReq.input('WRS_WORKING_END_TIME', mssql.DateTime, req.body.WRS_WORKING_END_TIME);
		dbReq.input('EXTRA_CHARGE_TYPE', mssql.NVarChar, req.body.EXTRA_CHARGE_TYPE);
		dbReq.input('EXTRA_CHARGE_RATE', mssql.Real, req.body.EXTRA_CHARGE_RATE);
		dbReq.input('CHANGE_REASON', mssql.NVarChar, req.body.CHANGE_REASON);
		dbReq.input('COST_CENTER', mssql.NVarChar, req.body.COST_CENTER);
		dbReq.input('JOB_CODE', mssql.NVarChar, req.body.JOB_CODE);
		dbReq.input('ETC', mssql.NVarChar, req.body.ETC);
		dbReq.input('ITEM', mssql.NVarChar, req.body.ITEM);
		dbReq.input('IS_SURVEY_EQP', mssql.NVarChar, req.body.IS_SURVEY_EQP);
		dbReq.input('CHECK_SURVEY_EQP', mssql.NVarChar, req.body.CHECK_SURVEY_EQP);
		dbReq.input('PART_NAME2', mssql.NVarChar, req.body.PART_NAME2);
		dbReq.input('PART_TREAT_MONEY', mssql.Int, req.body.PART_TREAT_MONEY);
		dbReq.input('SCR_MODEL', mssql.NVarChar, req.body.SCR_MODEL);
		dbReq.input('EQP_SN', mssql.NVarChar, req.body.EQP_SN);
		dbReq.input('PART_TYPE', mssql.Int, req.body.PART_TYPE);
		dbReq.input('IS_PART_GRANT_SN', mssql.NVarChar, req.body.IS_PART_GRANT_SN);
		dbReq.input('IS_DESORPTION_PART_GRANT_SN', mssql.NVarChar, req.body.IS_DESORPTION_PART_GRANT_SN);
		dbReq.input('PART_PUT_SN', mssql.NVarChar, req.body.PART_PUT_SN);
		dbReq.input('PART_ENTERING_PUT_SN', mssql.NVarChar, req.body.PART_ENTERING_PUT_SN);
		dbReq.input('PART_WARRANTY_SPEC', mssql.Int, req.body.PART_WARRANTY_SPEC);
		dbReq.input('PART_CHANGE_PREV_DATE', mssql.DateTime, req.body.PART_CHANGE_PREV_DATE);
		dbReq.input('IS_PART_CHANGE_CHARGE', mssql.Int, req.body.IS_PART_CHANGE_CHARGE);
		dbReq.input('PART_CHANGE_CHARGE_REASON', mssql.NVarChar, req.body.PART_CHANGE_CHARGE_REASON);
		dbReq.input('WORK_LINE_EMS_NAME', mssql.NVarChar, req.body.WORK_LINE_EMS_NAME);
		dbReq.input('WRS_CODE', mssql.VarChar, req.body.WRS_CODE);
		dbReq.input('EMS_UNREGISTER_REASON', mssql.NVarChar, req.body.EMS_UNREGISTER_REASON);
		dbReq.input('USED_EMS_UNREGISTER_REASON', mssql.NVarChar, req.body.USED_EMS_UNREGISTER_REASON);
		dbReq.input('EMS_REGISTER_DATE', mssql.DateTime, req.body.EMS_REGISTER_DATE);
		dbReq.input('EQP_SCR_CARRY_DATE', mssql.DateTime, req.body.EQP_SCR_CARRY_DATE);
		dbReq.input('EQP_MAIN_DUCT_NO', mssql.NVarChar, req.body.EQP_MAIN_DUCT_NO);
		dbReq.input('WORK_BAY_NAME', mssql.NVarChar, req.body.WORK_BAY_NAME);
		dbReq.input('ETC_PYT', mssql.NVarChar, req.body.ETC_PYT);
		dbReq.input('PUMP_CHAMBER_PYT', mssql.NVarChar, req.body.PUMP_CHAMBER_PYT);
		dbReq.input('TYPE2_GH', mssql.NVarChar, req.body.TYPE2_GH);
		dbReq.input('EXTRA_CHARGE_RATE_GH', mssql.NVarChar, req.body.EXTRA_CHARGE_RATE_GH);
		dbReq.input('NUMBER_OF_WORKER_GH', mssql.Int, req.body.NUMBER_OF_WORKER_GH);
		dbReq.input('TECHNICAL_TEAM_NAME_GH', mssql.NVarChar, req.body.TECHNICAL_TEAM_NAME_GH);
		dbReq.input('WORKER_NAME_GH', mssql.NVarChar, req.body.WORKER_NAME_GH);
		dbReq.input('WORKER_COUNT_GH', mssql.Int, req.body.WORKER_COUNT_GH);
		dbReq.input('IS_CLEAN_GH', mssql.NVarChar, req.body.IS_CLEAN_GH);
		dbReq.input('CHARGE_METHOD_GH', mssql.NVarChar, req.body.CHARGE_METHOD_GH);
		dbReq.input('WORK_TYPE_GH', mssql.NVarChar, req.body.WORK_TYPE_GH);
		dbReq.input('TECHNICAL_TEAM_GH', mssql.NVarChar, req.body.TECHNICAL_TEAM_GH);
		dbReq.input('PARKING_GH', mssql.NVarChar, req.body.PARKING_GH);
		dbReq.input('NEW_WARRANTY_GH', mssql.NVarChar, req.body.NEW_WARRANTY_GH);
		dbReq.input('REC_ID', String(req.body.REC_ID));

		dbReq.execute('usp_working_non_code_account_update').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
	} catch(err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/up-common-code', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('CODE_TABLE_NAME', String(req.body.tableNm));
		dbReq.input('VALUE_FIELD_NAME', String(req.body.tarFldNm));
		dbReq.input('CODE_NAME', String(req.body.tarFldVal));
		dbReq.input('CODE_FILED_NAME', String(req.body.whereFldNm));
		dbReq.input('CODE_VALUE', String(req.body.whereFldVal));
		dbReq.input('UPDATE_NO', Number(req.body.upCnt));

		dbReq.execute('usp_update_code_info').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/add-common-code', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('CODE_TABLE_NAME', mssql.VarChar, req.body.tableNm);
		dbReq.input('CODE_FILED_NAME', mssql.VarChar, req.body.codeFldNm);
		dbReq.input('VALUE_FIELD_NAME', mssql.VarChar, req.body.nameFldNm);
		dbReq.input('CODE_VALUE', mssql.VarChar, req.body.codeValue);
		dbReq.input('CODE_NAME', mssql.NVarChar, req.body.nameValue);
		dbReq.input('USER_ID', mssql.VarChar, req.body.userId);

		dbReq.execute('usp_Add_code_info').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/up-basic-code', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('IS_SUPERVISOR_CHECK', mssql.Int, req.body.IS_SUPERVISOR_CHECK);
		dbReq.input('EQP_CHECK_TIME', mssql.Int, req.body.EQP_CHECK_TIME);
		dbReq.input('WORK_PLAN_REMAIN_DAY', mssql.Int, req.body.WORK_PLAN_REMAIN_DAY);
		dbReq.input('START_BREAKFAST_TIME', mssql.VarChar, req.body.START_BREAKFAST_TIME);
		dbReq.input('END_BREAKFAST_TIME', mssql.VarChar, req.body.END_BREAKFAST_TIME);
		dbReq.input('INVOLVE_BREAKFAST_WORKING_TIME', mssql.Int, req.body.INVOLVE_BREAKFAST_WORKING_TIME);
		dbReq.input('START_LUNCH_TIME', mssql.VarChar, req.body.START_LUNCH_TIME);
		dbReq.input('END_LUNCH_TIME', mssql.VarChar, req.body.END_LUNCH_TIME);
		dbReq.input('INVLOVE_LUNCH_WORKING_TIME', mssql.Int, req.body.INVLOVE_LUNCH_WORKING_TIME);
		dbReq.input('START_DINNER_TIME', mssql.VarChar, req.body.START_DINNER_TIME);
		dbReq.input('END_DINNER_TIME', mssql.VarChar, req.body.END_DINNER_TIME);
		dbReq.input('INVOLVE_DINNER_WORKING_TIME', mssql.Int, req.body.INVOLVE_DINNER_WORKING_TIME);
		dbReq.input('START_LATEREST_TIME', mssql.VarChar, req.body.START_LATEREST_TIME);
		dbReq.input('END_LATEREST_TIME', mssql.VarChar, req.body.END_LATEREST_TIME);
		dbReq.input('INVOLVE_LATEREST_TIME', mssql.Int, req.body.INVOLVE_LATEREST_TIME);
		dbReq.input('HEALTH_CHECK_CYCLE', mssql.Int, req.body.HEALTH_CHECK_CYCLE);
		dbReq.input('WORK_EDU_CHECK_CYCLE', mssql.Int, req.body.WORK_EDU_CHECK_CYCLE);
		dbReq.input('SIGNAL_EDU_CHECK_CYCLE', mssql.Int, req.body.SIGNAL_EDU_CHECK_CYCLE);
		dbReq.input('ADMIN_EDU_CHECK_CYCLE', mssql.Int, req.body.ADMIN_EDU_CHECK_CYCLE);
		dbReq.input('SECURITY_EDU_CHECK_CYCLE', mssql.Int, req.body.SECURITY_EDU_CHECK_CYCLE);
		dbReq.input('FIT_EDU_CHECK_CYCLE', mssql.Int, req.body.FIT_EDU_CHECK_CYCLE);
		dbReq.input('LONG_TERM_EDU_CHECK_CYCLE', mssql.Int, req.body.LONG_TERM_EDU_CHECK_CYCLE);
		dbReq.input('MOD_USER_ID', mssql.VarChar, req.body.USER_ID);

		dbReq.execute('usp_update_base_code').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/put-holiday', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('USER_FROM', mssql.Int, req.body.userFrom);
		dbReq.input('IDX', mssql.Int, req.body.idx);
		dbReq.input('CURRENT_YEAR', mssql.Int, req.body.year);
		dbReq.input('COMPANY_HOLIDAY', mssql.DateTime, req.body.day);

		dbReq.execute('usp_company_holiday_register').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/eqp-info', async (req, res, next) => {
	console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('USER_FROM',                       mssql.Int,	   req.body.USER_FROM);
		dbReq.input('EQP_SN',                          mssql.VarChar,  req.body.EQP_SN);
		dbReq.input('WORK_PLACE_CODE',                 mssql.VarChar,  req.body.WORK_PLACE_CODE);
		dbReq.input('WORK_PART_CODE',                  mssql.VarChar,  req.body.WORK_PART_CODE);
		dbReq.input('WORK_COMPLEX_CODE',               mssql.VarChar,  req.body.WORK_COMPLEX_CODE);
		dbReq.input('WORK_SITE_CODE',                  mssql.VarChar,  req.body.WORK_SITE_CODE);
		dbReq.input('WORK_LINE_CODE',                  mssql.VarChar,  req.body.WORK_LINE_CODE);
		dbReq.input('WORK_FAB_TYPE_CODE',              mssql.VarChar,  req.body.WORK_FAB_TYPE_CODE);
		dbReq.input('WORK_FLOOR_CODE',                 mssql.VarChar,  req.body.WORK_FLOOR_CODE);
		dbReq.input('WORK_BAY_CODE',                   mssql.VarChar,  req.body.WORK_BAY_CODE);
		dbReq.input('WORK_PROCESS_CODE',               mssql.VarChar,  req.body.WORK_PROCESS_CODE);
		dbReq.input('WORK_SUB_PROCESS_CODE',           mssql.VarChar,  req.body.WORK_SUB_PROCESS_CODE);
		dbReq.input('SCR_SUB_PROC_PCS_CODE',           mssql.VarChar,  req.body.SCR_SUB_PROC_PCS_CODE);
		dbReq.input('SCR_EQP_ID',                      mssql.VarChar,  req.body.SCR_EQP_ID);
		dbReq.input('SCR_CHAMBER_CODE',                mssql.VarChar,  req.body.SCR_CHAMBER_CODE);
		dbReq.input('SCR_CHAMBER_INLET1_CODE',         mssql.VarChar,  req.body.SCR_CHAMBER_INLET1_CODE);
		dbReq.input('SCR_CHAMBER_INLET2_CODE',         mssql.VarChar,  req.body.SCR_CHAMBER_INLET2_CODE);
		dbReq.input('SCR_CODE',                        mssql.VarChar,  req.body.SCR_CODE);
		dbReq.input('MAIN_EQP_CODE',                   mssql.VarChar,  req.body.MAIN_EQP_CODE);
		dbReq.input('MAIN_EQP_MODEL_CODE',             mssql.VarChar,  req.body.MAIN_EQP_MODEL_CODE);
		dbReq.input('SCR_MAKER_CODE',                  mssql.VarChar,  req.body.SCR_MAKER_CODE);
		dbReq.input('MGR_MAKER_CODE',                  mssql.VarChar,  req.body.MGR_MAKER_CODE);
		dbReq.input('SCR_MODEL_CODE',                  mssql.VarChar,  req.body.SCR_MODEL_CODE);
		dbReq.input('EQP_TYPE_CODE',                   mssql.VarChar,  req.body.EQP_TYPE_CODE);
		dbReq.input('EQP_TYPE2_CODE',                  mssql.VarChar,  req.body.EQP_TYPE2_CODE);
		dbReq.input('GAS_CODE',                        mssql.VarChar,  req.body.GAS_CODE);
		dbReq.input('EXHAUST_CODE',                    mssql.VarChar,  req.body.EXHAUST_CODE);
		dbReq.input('WASTE_CODE',                      mssql.VarChar,  req.body.WASTE_CODE);
		dbReq.input('EQP_MAIN_DUCT_NO',                mssql.VarChar,  req.body.EQP_MAIN_DUCT_NO);
		dbReq.input('EQP_SCR_CARRY_DATE',              mssql.DateTime, req.body.EQP_SCR_CARRY_DATE);
		dbReq.input('EQP_SCR_NEW_SETUP_DATE',          mssql.DateTime, req.body.EQP_SCR_NEW_SETUP_DATE);
		dbReq.input('EQP_SCR_RELOCATE_SETUP_DATE',     mssql.DateTime, req.body.EQP_SCR_RELOCATE_SETUP_DATE);
		dbReq.input('EQP_SCR_HAS_SMS',                 mssql.Int,      req.body.EQP_SCR_HAS_SMS);
		dbReq.input('EQP_SCR_WARRANTY_TERM',           mssql.Int,      req.body.EQP_SCR_WARRANTY_TERM);
		dbReq.input('IS_EQP_SCR_WARRANTY',             mssql.Int,      req.body.IS_EQP_SCR_WARRANTY);
		dbReq.input('EQP_SCR_ETC',                     mssql.VarChar,  req.body.EQP_SCR_ETC);
		dbReq.input('EQP_TURNON_DATE',                 mssql.DateTime, req.body.EQP_TURNON_DATE);
		dbReq.input('EQP_TURNOFF_DATE',                mssql.DateTime, req.body.EQP_TURNOFF_DATE);
		dbReq.input('EQP_SCR_PM_CYCLE',                mssql.Int,      req.body.EQP_SCR_PM_CYCLE);
		dbReq.input('EQP_WAFER_SIZE_CODE',             mssql.Int,      req.body.EQP_WAFER_SIZE_CODE);
		dbReq.input('EQP_SCR_RUNNING_STATUS',          mssql.Int,      req.body.EQP_SCR_RUNNING_STATUS);
		dbReq.input('EQP_SCR_3PART_PM_CYCLE',          mssql.Int,      req.body.EQP_SCR_3PART_PM_CYCLE);
		dbReq.input('EQP_SCR_TBM_CYCLE',               mssql.Int,      req.body.EQP_SCR_TBM_CYCLE);
		dbReq.input('EQP_SCR_EXHAUST_CYCLE',           mssql.Int,      req.body.EQP_SCR_EXHAUST_CYCLE);
		dbReq.input('EQP_SCR_TRNSMITTER_CYCLE',        mssql.Int,      req.body.EQP_SCR_TRNSMITTER_CYCLE);
		dbReq.input('IS_EQP_SCR_NIGHT_CHECK',          mssql.Int,      req.body.IS_EQP_SCR_NIGHT_CHECK);
		dbReq.input('IS_EQP_SCR_ADMIN_CHECK',          mssql.Int,      req.body.IS_EQP_SCR_ADMIN_CHECK);
		dbReq.input('IS_EQP_SCR_SUPERVISOR_CHECK',     mssql.Int,      req.body.IS_EQP_SCR_SUPERVISOR_CHECK);
		dbReq.input('IS_EQP_SCR_TTTM',                 mssql.Int,      req.body.IS_EQP_SCR_TTTM);
		dbReq.input('IS_EQL_SCR_OS_SOL_VLAVE',         mssql.Int,      req.body.IS_EQL_SCR_OS_SOL_VLAVE);
		dbReq.input('IS_EQP_SCR_DEHUMI',               mssql.Int,      req.body.IS_EQP_SCR_DEHUMI);
		dbReq.input('EQP_SCR_LNG_SV',                  mssql.Real,     req.body.EQP_SCR_LNG_SV);
		dbReq.input('EQP_SCR_O2_SV',                   mssql.Real,     req.body.EQP_SCR_O2_SV);
		dbReq.input('EQP_SCR_AIR_SV',                  mssql.Real,     req.body.EQP_SCR_AIR_SV);
		dbReq.input('EQP_SCR_NIGHT_CHECK_CYCLE',       mssql.Int,      req.body.EQP_SCR_NIGHT_CHECK_CYCLE);
		dbReq.input('EQP_SCR_ADMIN_CHECK_CYCLE',       mssql.Int,      req.body.EQP_SCR_ADMIN_CHECK_CYCLE);
		dbReq.input('EQP_SCR_SUPERVISOR_CHECK_CYCLE',  mssql.Int,      req.body.EQP_SCR_SUPERVISOR_CHECK_CYCLE);
		dbReq.input('USER_ID',                         mssql.VarChar,  req.body.USER_ID);
	
		dbReq.execute('usp_eqp_scr_register').then(result => {
			console.log(result);
			result.isSuccess = true;
			res.json(result);
		}).catch(err => {
			var obj = new Object();
			obj.isSuccess = false;
			obj.message = err.message;
			res.json(obj);
		});
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

module.exports = router;