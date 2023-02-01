var express = require('express');
const {pool} = require('../config/dbPool');
const {commQuerySet} = require('../config/sqlFactory');

var router = express.Router();

router.get('/place-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectPlaceCodeTotal;
		} else {
			query = commQuerySet.selectPlaceCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/part-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectPartCodeTotal;
		} else {
			query = commQuerySet.selectPartCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);
		
		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/complex-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectComplexCodeTotal;
		} else {
			query = commQuerySet.selectComplexCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/line-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectLineCodeTotal;
		} else {
			query = commQuerySet.selectLineCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/eqp-scr-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectEqpScrCodeTotal;
		} else {
			query = commQuerySet.selectEqpScrCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/team-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query = commQuerySet.selectTeamCode;
		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/group-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query = commQuerySet.selectGroupCode;
		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/position-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectPositionCodeTotal;
		} else {
			query = commQuerySet.selectPositionCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/duty-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectDutyCodeTotal;
		} else {
			query = commQuerySet.selectDutyCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/site-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectSiteCodeTotal;
		} else {
			query = commQuerySet.selectSiteCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			console.log(req.query.pageNo + ',' + req.query.pageSize);
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
			console.log(addPage);
		}
		query = query.replace('#addPaging', addPage);
		console.log(query);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/floor-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectFloorCodeTotal;
		} else {
			query = commQuerySet.selectFloorCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/bay-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectBayCodeTotal;
		} else {
			query = commQuerySet.selectBayCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/ems-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectEmsCodeTotal;
		} else {
			query = commQuerySet.selectEmsCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/process-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectProcessCodeTotal;
		} else {
			query = commQuerySet.selectProcessCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/sub-process-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectSubProcessCodeTotal;
		} else {
			query = commQuerySet.selectSubProcessCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/scr-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectScrCodeTotal;
		} else {
			query = commQuerySet.selectScrCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/scr-model-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectScrModelCodeTotal;
		} else {
			query = commQuerySet.selectScrModelCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/eqp-type1-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectEqpType1CodeTotal;
		} else {
			query = commQuerySet.selectEqpType1Code;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/eqp-type2-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectEqpType2CodeTotal;
		} else {
			query = commQuerySet.selectEqpType2Code;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/gas-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectGasCodeTotal;
		} else {
			query = commQuerySet.selectGasCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/exhaust-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectExhaustCodeTotal;
		} else {
			query = commQuerySet.selectExhaustCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/waste-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectWasteCodeTotal;
		} else {
			query = commQuerySet.selectWasteCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/main-maker-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectMainMakerCodeTotal;
		} else {
			query = commQuerySet.selectMainMakerCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/main-model-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectMainModelCodeTotal;
		} else {
			query = commQuerySet.selectMainModelCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/scr-maker-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectScrMakerCodeTotal;
		} else {
			query = commQuerySet.selectScrMakerCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/mgr-maker-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectMgrMakerCodeTotal;
		} else {
			query = commQuerySet.selectMgrMakerCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/chamber-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectChamberCodeTotal;
		} else {
			query = commQuerySet.selectChamberCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/violation-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectViolationCodeTotal;
		} else {
			query = commQuerySet.selectViolationCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/accident-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectAccidentCodeTotal;
		} else {
			query = commQuerySet.selectAccidentCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/expose-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectExposeCodeTotal;
		} else {
			query = commQuerySet.selectExposeCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/accident-type-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectAccidentTypeCodeTotal;
		} else {
			query = commQuerySet.selectAccidentTypeCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/irration-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectIrrationCodeTotal;
		} else {
			query = commQuerySet.selectIrrationCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/irration-accident-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectIrrationAccidentCodeTotal;
		} else {
			query = commQuerySet.selectIrrationAccidentCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/alram-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selectAlramCodeTotal;
		} else {
			query = commQuerySet.selectAlramCode;
		}
		query = query.replace('#addWhere', '');
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/basic-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query = commQuerySet.selectBasicCode;
		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/fab-type-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query = commQuerySet.selectFabTypeCode;
		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/subpcs-process-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query = commQuerySet.selectSubProcessPcsCode;
		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/scr-chamber-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query = commQuerySet.selectScrChamberCode;
		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/scr-inlet1-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query = commQuerySet.selectScrInlet1Code;
		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/scr-inlet2-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query = commQuerySet.selectScrInlet2Code;
		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.get('/ot-item-code', async (req, res) => {
	try {
		const conn = await pool;
		const dbReq = conn.request();
		
		var query;
		var isTotal = (req.query.mode != null && req.query.mode == 'total');
		if (isTotal) {
			query = commQuerySet.selecOtItemCodeTotal;
		} else {
			query = commQuerySet.selecOtItemCode;
		}
		query = query.replace('#addWhere', ''); //현재 검색 조건이 없어 빈값 치환
		var addPage = "";
		if (req.query.pageNo != null && req.query.pageSize != null) {
			addPage += "OFFSET (@pageNo-1)*@pageSize ROWS FETCH NEXT @pageSize ROWS ONLY";
			dbReq.input('pageNo', Number(req.query.pageNo));
			dbReq.input('pageSize', Number(req.query.pageSize));
		}
		query = query.replace('#addPaging', addPage);

		const result = await dbReq.query(query);
		console.log(result);
		
		res.json(result.recordset);
	}	 catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

module.exports = router;