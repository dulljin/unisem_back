var express = require('express');
const {mssql, pool} = require('../config/dbPool');
const {querySet, commQuerySet} = require('../config/sqlFactory');
const authApi = require('./middlewares/apiAuth');

var router = express.Router();

router.use(authApi);

router.get('/user-reg-confirm/total-size', async (req, res) => {
	try {
	  const conn = await pool;
	  const dbReq = conn.request();
	  var query = querySet.selectUserConfirmTotal;
	  const result = await dbReq.query(query);
  
	  console.log(result.recordset);
	  res.json(result.recordset);
	} catch (err) {
	  res.status(500);
	  res.send(err.message);
	}
});

router.get('/user-reg-confirm/:pageNo/:pageSize', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
    	dbReq.input('pageNo', mssql.Int, req.params.pageNo);
    	dbReq.input('pageSize', mssql.Int, req.params.pageSize);
		
		var query = querySet.selectUserConfirm;
		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/work-schedule-confirm/:pageNo/:pageSize', async (req, res) => {
	console.log(req.query);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		var y = req.query.year;
		var m = req.query.month;

		dbReq.input('pageNo', mssql.Int, req.params.pageNo);
    	dbReq.input('pageSize', mssql.Int, req.params.pageSize);
		dbReq.input('year', mssql.VarChar, y);

		var addWhere = "";
		if (m != null) {
			dbReq.input('month', mssql.VarChar, m);
			addWhere += " AND month(WORKING_START_DATE)=@month";
		}

		var query = querySet.selectWorkScheduleConfirm;
		query = query.replace('#addWhere', addWhere);

		console.log(query);
		const result = await dbReq.query(query);
		console.log(result);

		res.json(result.recordset);
	} catch(err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/work-schedule-confirm/total-size', async (req, res) => {
	console.log(req.query);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		var y = req.query.year;
		var m = req.query.month;

		dbReq.input('year', mssql.VarChar, y);

		var addWhere = "";
		if (m != null) {
			dbReq.input('month', mssql.VarChar, m);
			addWhere += " AND month(WORKING_START_DATE)=@month";
		}

		var query = querySet.selectWorkScheduleConfirmTotal;
		query = query.replace('#addWhere', addWhere);

		console.log(query);
		const result = await dbReq.query(query);
		console.log(result);

		res.json(result.recordset);
	} catch(err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/work-schedule/:year/:month/:userId', async (req, res) => {
	console.log(req.params);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('userId', mssql.VarChar, req.params.userId);
		var y = Number(req.params.year);
		var m = Number(req.params.month);
		var temp = y + '-' + m + '-01';
		dbReq.input('startDate', mssql.VarChar, temp);
		m++;
		if (m > 12) {
			y++;
			m = 1;
		}
		temp = y + '-' + m + '-01';
		dbReq.input('endDate', mssql.VarChar, temp);

		var query = querySet.selectWorkSchedule;
		query = query.replace('#lt', '<');
		query = query.replace('#gt', '>');

		console.log(query);
		const result = await dbReq.query(query);
		console.log(result);

		res.json(result.recordset);
	} catch(err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/user-commute-hist/total-size', async (req, res) => {
	try {
	  const conn = await pool;
	  const dbReq = conn.request();
	  dbReq.input('year', mssql.Int, req.query.year);

	  var addWhere = "";
		if (req.query.userId != null) {
			dbReq.input('userId', mssql.VarChar, req.query.userId);
			addWhere += " AND user_id=@userId"
		}

		if (req.query.userNm != null) {
			dbReq.input('userNm', mssql.VarChar, req.query.userNm);
			addWhere += " AND user_name=@userNm"
		}

		if (req.query.month != null) {
			dbReq.input('month', mssql.Int, req.query.month);
			addWhere += " AND current_month=@month";
		}

		if (req.query.day != null) {
			dbReq.input('day', mssql.Int, req.query.day);
			addWhere += " AND current_day=@day";
		}

	  var query = querySet.selectUserCommuteHistTotal;
	  query = query.replace('#addWhere', addWhere);

	  const result = await dbReq.query(query);

	  console.log(result.recordset);
	  res.json(result.recordset);
	} catch (err) {
	  res.status(500);
	  res.send(err.message);
	}
});

router.get('/user-commute-hist', async (req, res) => {
	console.log(req.query);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('year', mssql.Int, req.query.year);

		var addWhere = "";
		if (req.query.userId != null) {
			dbReq.input('userId', mssql.VarChar, req.query.userId);
			addWhere += " AND user_id=@userId"
		}

		if (req.query.userNm != null) {
			dbReq.input('userNm', mssql.VarChar, req.query.userNm);
			addWhere += " AND user_name=@userNm"
		}

		if (req.query.month != null) {
			dbReq.input('month', mssql.Int, req.query.month);
			addWhere += " AND current_month=@month";
		}

		if (req.query.day != null) {
			dbReq.input('day', mssql.Int, req.query.day);
			addWhere += " AND current_day=@day";
		}

		var query = querySet.selectUserCommuteHist;
		query = query.replace('#addWhere', addWhere);

		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', mssql.Int, req.query.pageNo);
			dbReq.input('pageSize', mssql.Int, req.query.pageSize);
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);

		res.json(result.recordset);
	} catch(err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/event-check-hist/:year', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('year', mssql.VarChar, req.params.year);

		var addWhere = "";
		if (req.query.month != null) {
			dbReq.input('month', mssql.VarChar, req.query.month);
			addWhere += " AND month(EVENT_CHECK_DAY)=@month";
		}
		
		var query = querySet.selectEventCheckHist;
		query = query.replace('#addWhere', addWhere);
		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/check-status-line/total-size/:tDate/:placeCd', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();

		dbReq.input('mode', mssql.Int, req.query.mode);
		dbReq.input('tDate', mssql.VarChar, req.params.tDate);
		dbReq.input('placeCd', mssql.VarChar, req.params.placeCd);

		var addWhere = '';
		if (req.query.partCd != null) {
			addWhere += ' AND WORK_PART_CODE=@partCd';
			dbReq.input('partCd', mssql.VarChar, req.query.partCd);
		}
		if (req.query.complexCd != null) {
			addWhere += ' AND WORK_COMPLEX_CODE=@complexCd';
			dbReq.input('complexCd', mssql.VarChar, req.query.complexCd);
		}
		if (req.query.lineCd != null) {
			addWhere += ' AND WORK_LINE_CODE=@lineCd';
			dbReq.input('lineCd', mssql.VarChar, req.query.lineCd);
		}
		
		var query = querySet.selectCheckStatusLineTotal;
		query = query.replace('#addWhere', addWhere);
		const result = await dbReq.query(query);
		console.log(result);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/check-status-line/:tDate/:placeCd', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('pageNo', mssql.Int, req.query.pageNo);
		dbReq.input('pageSize', mssql.Int, req.query.pageSize);
		dbReq.input('mode', mssql.Int, req.query.mode);
		dbReq.input('tDate', mssql.VarChar, req.params.tDate);
		dbReq.input('placeCd', mssql.VarChar, req.params.placeCd);
		
		var addWhere = '';
		if (req.query.partCd != null) {
			addWhere += ' AND WORK_PART_CODE=@partCd';
			dbReq.input('partCd', mssql.VarChar, req.query.partCd);
		}
		if (req.query.complexCd != null) {
			addWhere += ' AND WORK_COMPLEX_CODE=@complexCd';
			dbReq.input('complexCd', mssql.VarChar, req.query.complexCd);
		}
		if (req.query.lineCd != null) {
			addWhere += ' AND WORK_LINE_CODE=@lineCd';
			dbReq.input('lineCd', mssql.VarChar, req.query.lineCd);
		}

		var query = querySet.selectCheckStatusLine;
		query = query.replace('#addWhere', addWhere);
		const result = await dbReq.query(query);
		console.log(result);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/miss-check-list/:tDate/:mode', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('tDate', mssql.VarChar, req.params.tDate);
		dbReq.input('mode', mssql.Int, req.params.mode);
		dbReq.input('lineCd', mssql.VarChar, req.query.lineCd);

		var query = querySet.selectMissCheckList;
		const result =await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/eqp-check-hist/total-size/:sDate/:eDate/:eqpSn', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('eqpSn', mssql.VarChar, req.params.eqpSn);
		dbReq.input('sDate', mssql.VarChar, req.params.sDate);
		dbReq.input('eDate', mssql.VarChar, req.params.eDate);

		var query = querySet.selectEqpCheckHistTotal;
		const result =await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/eqp-check-hist/:sDate/:eDate/:eqpSn', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('eqpSn', mssql.VarChar, req.params.eqpSn);
		dbReq.input('sDate', mssql.VarChar, req.params.sDate);
		dbReq.input('eDate', mssql.VarChar, req.params.eDate);

		var query = querySet.selectEqpCheckHist;
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', mssql.Int, req.query.pageNo);
			dbReq.input('pageSize', mssql.Int, req.query.pageSize);
		}
		query = query.replace('#addPaging', addPage);

		const result =await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/wrs-work-hist/total-size/:sDate/:eDate', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('sDate', mssql.VarChar, req.params.sDate);
		dbReq.input('eDate', mssql.VarChar, req.params.eDate);

		var query = querySet.selectWrsWorkHistTotal;
		var addWhere = "";
		if (req.query.placeCd != null) {
			addWhere += " AND WORK_PLACE_CODE=@placeCd";
			dbReq.input('placeCd', mssql.VarChar, req.query.placeCd);
		}
		if (req.query.partCd != null) {
			addWhere += " AND WORK_PART_CODE=@partCd";
			dbReq.input('partCd', mssql.VarChar, req.query.partCd);
		}
		if (req.query.complexCd != null) {
			addWhere += " AND WORK_COMPLEX_CODE=@complexCd";
			dbReq.input('complexCd', mssql.VarChar, req.query.complexCd);
		}
		if (req.query.lineCd != null) {
			addWhere += " AND WORK_LINE_CODE=@lineCd";
			dbReq.input('lineCd', mssql.VarChar, req.query.lineCd);
		}
		query = query.replace('#addWhere', addWhere);
		const result = await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/wrs-work-hist/:sDate/:eDate', async (req, res) => {
	console.log(req.query);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('sDate', mssql.VarChar, req.params.sDate);
		dbReq.input('eDate', mssql.VarChar, req.params.eDate);

		var query = querySet.selectWrsWorkHist;
		var addWhere = "";
		if (req.query.placeCd != null) {
			addWhere += " AND WORK_PLACE_CODE=@placeCd";
			dbReq.input('placeCd', mssql.VarChar, req.query.placeCd);
		}
		if (req.query.partCd != null) {
			addWhere += " AND WORK_PART_CODE=@partCd";
			dbReq.input('partCd', mssql.VarChar, req.query.partCd);
		}
		if (req.query.complexCd != null) {
			addWhere += " AND WORK_COMPLEX_CODE=@complexCd";
			dbReq.input('complexCd', mssql.VarChar, req.query.complexCd);
		}
		if (req.query.lineCd != null) {
			addWhere += " AND WORK_LINE_CODE=@lineCd";
			dbReq.input('lineCd', mssql.VarChar, req.query.lineCd);
		}
		query = query.replace('#addWhere', addWhere);
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', mssql.Int, req.query.pageNo);
			dbReq.input('pageSize', mssql.Int, req.query.pageSize);
		}
		query = query.replace('#addPaging', addPage);
		console.log(query);
		const result = await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/wrs-account-list', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();

		var addWhere = "WHERE ";
		if (req.query.workCode != null) {
			addWhere += "work_code=@workCode";
			dbReq.input('workCode', mssql.VarChar, req.query.workCode);
		}
		if (req.query.sDate != null && req.query.eDate != null) {
			addWhere += "rec_time BETWEEN @sDate AND @eDate";
			dbReq.input('sDate', mssql.VarChar, req.query.sDate);
			dbReq.input('eDate', mssql.VarChar, req.query.eDate);
		}
		if (req.query.placeCd != null) {
			addWhere += " AND work_place_code=@placeCd";
			dbReq.input('placeCd', mssql.VarChar, req.query.placeCd);
		}
		if (req.query.partCd != null) {
			addWhere += " AND work_part_code=@partCd";
			dbReq.input('partCd', mssql.VarChar, req.query.partCd);
		}
		if (req.query.complexCd != null) {
			addWhere += " AND work_complex_code=@complexCd";
			dbReq.input('complexCd', mssql.VarChar, req.query.complexCd);
		}
		if (req.query.lineCd != null) {
			addWhere += " AND work_line_code=@lineCd";
			dbReq.input('lineCd', mssql.VarChar, req.query.lineCd);
		}
		
		var query = querySet.selectWrsAccountList;
		if (addWhere.length < 6) { // 검색 조건 없을 시, 초기화
			addWhere = '';
		}
		query = query.replace('#addWhere', addWhere);
		console.log(query);
		const result = await dbReq.query(query);
		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/ot-confirm-list/:year/:month', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('year', mssql.VarChar, req.params.year);
		dbReq.input('month', mssql.VarChar, req.params.month);

		dbReq.input('pageNo', mssql.Int, req.query.pageNo);
		dbReq.input('pageSize', mssql.Int, req.query.pageSize);

		var query = querySet.selecOTconfirmList;
		const result = await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/ot-confirm-list/total-size/:year/:month', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('year', mssql.VarChar, req.params.year);
		dbReq.input('month', mssql.VarChar, req.params.month);

		var query = querySet.selecOTconfirmListTotal;
		const result = await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/violation-list/:sDate/:eDate', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('sDate', mssql.VarChar, req.params.sDate);
		dbReq.input('eDate', mssql.VarChar, req.params.eDate);

		var addWhere = "";
		if (req.query.placeCd != null && req.query.placeCd.length > 0) {
			addWhere += ' AND work_place_code=@placeCd';
			dbReq.input('placeCd', mssql.VarChar, req.query.placeCd);
		}
		if (req.query.partCd != null) {
			addWhere += ' AND work_part_code=@partCd';
			dbReq.input('partCd', mssql.VarChar, req.query.partCd);
		}
		if (req.query.complexCd != null) {
			addWhere += ' AND work_complex_code=@complexCd';
			dbReq.input('complexCd', mssql.VarChar, req.query.complexCd);
		}
		if (req.query.lineCd != null) {
			addWhere += ' AND work_line_code=@lineCd';
			dbReq.input('lineCd', mssql.VarChar, req.query.lineCd);
		}
		if (req.query.pageNo != null && req.query.pageSize != null) {
			dbReq.input('pageNo', mssql.Int, req.query.pageNo);
			dbReq.input('pageSize', mssql.Int, req.query.pageSize);
		}

		var query;
		if (req.query.mode != null && req.query.mode == 'total') {
			query = querySet.selecViolationListTotal;			
		} else {
			query = querySet.selecViolationList;
		}
		query = query.replace('#addWhere', addWhere);

		const result = await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/irration-list/:sDate/:eDate', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('sDate', mssql.VarChar, req.params.sDate);
		dbReq.input('eDate', mssql.VarChar, req.params.eDate);

		var addWhere = "";
		if (req.query.placeCd != null && req.query.placeCd.length > 0) {
			addWhere += ' AND work_place_code=@placeCd';
			dbReq.input('placeCd', mssql.VarChar, req.query.placeCd);
		}
		if (req.query.partCd != null) {
			addWhere += ' AND work_part_code=@partCd';
			dbReq.input('partCd', mssql.VarChar, req.query.partCd);
		}
		if (req.query.complexCd != null) {
			addWhere += ' AND work_complex_code=@complexCd';
			dbReq.input('complexCd', mssql.VarChar, req.query.complexCd);
		}
		if (req.query.lineCd != null) {
			addWhere += ' AND work_line_code=@lineCd';
			dbReq.input('lineCd', mssql.VarChar, req.query.lineCd);
		}
		if (req.query.pageNo != null && req.query.pageSize != null) {
			dbReq.input('pageNo', mssql.Int, req.query.pageNo);
			dbReq.input('pageSize', mssql.Int, req.query.pageSize);
		}

		var query;
		if (req.query.mode != null && req.query.mode == 'total') {
			query = querySet.selectIrrationListTotal;			
		} else {
			query = querySet.selectIrrationList;
		}
		query = query.replace('#addWhere', addWhere);

		const result = await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/holiday-list/:bYear/:cYear', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('bYear', mssql.VarChar, req.params.bYear);
		dbReq.input('cYear', mssql.VarChar, req.params.cYear);

		var query = querySet.selectHolidayList;
		const result = await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/scr-eqp-detail/:eqpSn', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('eqpSn', mssql.VarChar, req.params.eqpSn);

		var query = querySet.selectScrEqpDetail;
		const result = await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/eqp-list', async (req, res) => {
	console.log(req.query);
	try {
		const conn = await pool;
		const dbReq = conn.request();

		var query = querySet.selectEqpList;
		if (req.query.mode != null && req.query.mode == 'total') {
			query = querySet.selectEqpListTotal;
		}

		var addWhere = "";
		if (req.query.placeCd != null) {
			addWhere += " WORK_PLACE_CODE=@placeCd";
			dbReq.input('placeCd', mssql.VarChar, req.query.placeCd);
		}
		if (req.query.partCd != null) {
			addWhere += " AND WORK_PART_CODE=@partCd";
			dbReq.input('partCd', mssql.VarChar, req.query.partCd);
		}
		if (req.query.complexCd != null) {
			addWhere += " AND WORK_COMPLEX_CODE=@complexCd";
			dbReq.input('complexCd', mssql.VarChar, req.query.complexCd);
		}
		if (req.query.lineCd != null) {
			addWhere += " AND WORK_LINE_CODE=@lineCd";
			dbReq.input('lineCd', mssql.VarChar, req.query.lineCd);
		}
		if (req.query.floorCd != null) {
			addWhere += " AND WORK_FLOOR_CODE=@floorCd";
			dbReq.input('floorCd', mssql.VarChar, req.query.floorCd);
		}
		if (req.query.bayCd != null) {
			addWhere += " AND WORK_BAY_CODE=@bayCd";
			dbReq.input('bayCd', mssql.VarChar, req.query.bayCd);
		}
		if (addWhere.length > 0) {
			addWhere = 'WHERE ' + addWhere;
		}
		query = query.replace('#addWhere', addWhere);
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', mssql.Int, req.query.pageNo);
			dbReq.input('pageSize', mssql.Int, req.query.pageSize);
		}
		query = query.replace('#addPaging', addPage);
		console.log(query);
		const result = await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/eqp-current-status', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();

		var query = querySet.selectEqpStatusList;
		if (req.query.mode != null && req.query.mode == 'total') {
			query = querySet.selectEqpStatusListTotal;
		}

		var addWhere = "";
		if (req.query.placeCd != null) {
			addWhere += " WORK_PLACE_CODE=@placeCd";
			dbReq.input('placeCd', mssql.VarChar, req.query.placeCd);
		}
		if (req.query.partCd != null) {
			addWhere += " AND WORK_PART_CODE=@partCd";
			dbReq.input('partCd', mssql.VarChar, req.query.partCd);
		}
		if (req.query.complexCd != null) {
			addWhere += " AND WORK_COMPLEX_CODE=@complexCd";
			dbReq.input('complexCd', mssql.VarChar, req.query.complexCd);
		}
		if (req.query.lineCd != null) {
			addWhere += " AND WORK_LINE_CODE=@lineCd";
			dbReq.input('lineCd', mssql.VarChar, req.query.lineCd);
		}
		if (req.query.floorCd != null) {
			addWhere += " AND WORK_FLOOR_CODE=@floorCd";
			dbReq.input('floorCd', mssql.VarChar, req.query.floorCd);
		}
		if (req.query.bayCd != null) {
			addWhere += " AND WORK_BAY_CODE=@bayCd";
			dbReq.input('bayCd', mssql.VarChar, req.query.bayCd);
		}
		if (addWhere.length > 0) {
			addWhere = 'WHERE ' + addWhere;
		}
		query = query.replace('#addWhere', addWhere);
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', mssql.Int, req.query.pageNo);
			dbReq.input('pageSize', mssql.Int, req.query.pageSize);
		}
		query = query.replace('#addPaging', addPage);
		console.log(query);
		const result = await dbReq.query(query);

		res.json(result.recordset);
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

module.exports = router;