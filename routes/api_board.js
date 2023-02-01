var express = require('express');
var fs = require('fs');
const {mssql, pool} = require('../config/dbPool');
const {querySet} = require('../config/sqlFactory');
const multer = require('multer');
const authApi = require('./middlewares/apiAuth');
const { exception } = require('console');

var router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'storage');
  },
  filename (req, file, callback) {
    var fileNm = Date.now().toString() + "_" + file.originalname;
    /*
    let array = file.originalname.split('.');
    array[0] = '_' + array[0];
    array[1] = '.' + array[1];
    array.splice(0, 0, Date.now().toString());
    const result = array.join('');
    */
    console.log(fileNm + "<---------");
    callback(null, fileNm);
  }
});

const upload = multer({
  storage,
  limits: {
    files: 5,
    fileSize: 1024 * 1024 *1024
  }
});

router.get('/download-apk', async(req, res) => {
  try {
    res.setHeader('Content-disposition', 'attachment;filename=USC.apk');
    res.setHeader('Content-type', 'application/vnd.android.package-archive');
    //res.setHeader('Content-type', 'application/application/x-zip-compressed');
    var filestream = fs.createReadStream('./storage/apk/USC.apk');
    filestream.pipe(res);
  } catch(err) {
    res.status(500);
    res.send(err.message);
  }
});

router.get('/downfile/:idx', async(req, res) => {
  var defDir = "./storage/";
  try {
    const conn = await pool;
    const dbReq = conn.request();
    dbReq.input('idx', mssql.Int, req.params.idx);

    var query = querySet.selectBoardFile;
    const result = await dbReq.query(query);

    var fileNm = result.recordset[0].FILE_NM;
    var downNm = fileNm.substring(fileNm.indexOf('_') + 1, fileNm.length);
    var mime = result.recordset[0].FILE_MIME;
    
    res.setHeader('Content-disposition', 'attachment;filename=' + encodeURI(downNm));
    res.setHeader('Content-type', mime);
    fs.statSync(defDir + fileNm);
    var filestream = fs.createReadStream(defDir + fileNm);
    filestream.pipe(res);
  } catch (err) {
    if (err.code == 'ENOENT') {
      res.status(410);
      var retObj = new Object();
      retObj.isSuccess = false;
      retObj.message = 'not found request file!';
      res.json(retObj);
    } else {
      res.status(500);
      res.send(err.message);
    }
  }
});

router.get('/delfile/:idx', async(req, res) => {
  var defDir = "./storage/";
  try {
    const conn = await pool;
    const dbReq = conn.request();
    dbReq.input('idx', mssql.Int, req.params.idx);

    var query = querySet.selectBoardFile;
    const result = await dbReq.query(query);

    // 물리 파일 삭제
    var fileNm = result.recordset[0].FILE_NM;
    const fullNm = defDir + fileNm;
    console.log(fullNm);
    fs.statSync(fullNm);
    fs.unlinkSync(fullNm, err => {
      throw new exception('file delete fail!');
    });

    // db 파일 정보 삭제
    query = querySet.deleteBoardFile;
    const result1 = await dbReq.query(query);

    res.status(200);
    var retObj = new Object();
    retObj.isSuccess = true;
    retObj.message = 'file delete complete!';
    res.json(retObj);
  } catch(err) {
    var retObj = new Object();
    retObj.isSuccess = false;
    if (err.code == 'ENOENT') {
      res.status(410);
      retObj.message = 'not found request file!';
      res.json(retObj); 
    } else {
      console.log(err);
      res.status(500);
      retObj.message = err.message;
      res.json(retObj); 
    }
  }

});

router.use(authApi);

router.post('/upload', upload.array('upFile', 3), async (req, res, next) =>{
  try {
    const files = req.files;
    let originalName = '';
    let fileName = '';
    let mimeType = '';
    let size = 0;

    const conn = await pool;
    const dbReq = conn.request();
    dbReq.input('refIdx', mssql.Int, req.body.refIdx);
    dbReq.input('regId', mssql.VarChar, req.body.regId);

    if (Array.isArray(files)) { 
        console.log(req.body);

        files.forEach(x => {
          dbReq.input('fileNm', String(x.filename));
          console.log(x.filename);
          dbReq.input('fileMime', mssql.VarChar, x.mimetype);
          dbReq.execute('put_board_file').then(result => {
            console.log(result);
          });
        });
      } else { 
        console.log(`files is not array~`); 
        originalName = files[0].originalname; 
        fileName = files[0].filename; 
        mimeType = files[0].mimetype; 
        size = files[0].size; 
      } 
      res.status(200);
      var retObj = new Object();
      retObj.isSuccess = true;
      retObj.message = 'upload complete!';
      res.json(retObj);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.get('/reply/:refIdx', async (req, res) => {
  console.log(req.params);
  try {
    const conn = await pool;
    const dbReq = conn.request();
    dbReq.input('refIdx', mssql.Int, req.params.refIdx);

    var query = querySet.selectReply;
    console.log(query);
    const result = await dbReq.query(query);

    console.log(result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.get('/file-list/:refIdx', async (req, res) => {
  try {
    const conn = await pool;
    const dbReq = conn.request();
    dbReq.input('refIdx', mssql.Int, req.params.refIdx);

    var query = querySet.selectFiles;
    console.log(query);
    const result = await dbReq.query(query);

    console.log(result.recordset);
    result.recordset.forEach((elem, idx) => {
      elem.FILE_NM = elem.FILE_NM.substring(elem.FILE_NM.indexOf('_') + 1);
      result.recordset[idx].FILE_NM = elem.FILE_NM;
    });
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.get('/detail/:idx', async (req, res) => {
  console.log(req.params);
  try {
    const conn = await pool;
    const dbReq = conn.request();
    dbReq.input('idx', mssql.Int, req.params.idx);

    var query = querySet.selectBoardDetail;
    console.log(query);
    const result = await dbReq.query(query);
    
    console.log(result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.get('/:boardNo/total-size', async (req, res) => {
  console.log(req.params);
  try {
    const conn = await pool;
    const dbReq = conn.request();
    dbReq.input('boardNo', mssql.Int, req.params.boardNo);
    var query = querySet.selectBoardTotal;
    console.log(query);
    const result = await dbReq.query(query);

    console.log(result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.get('/:boardNo/:pageNo/:pageSize', async (req, res) => {
  console.log(req.params);
  try {
    const conn = await pool;
    const dbReq = conn.request();
    dbReq.input('boardNo', mssql.Int, req.params.boardNo);
    dbReq.input('pageNo', mssql.Int, req.params.pageNo);
    dbReq.input('pageSize', mssql.Int, req.params.pageSize);

    var query = querySet.selectBoardList;
    console.log(query);
    const result = await dbReq.query(query);
    
    console.log(result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.get('/board-info/:boardNo', async (req, res) => {
  try {
    const conn = await pool;
    const dbReq = conn.request();
    dbReq.input('boardNo', mssql.Int, req.params.boardNo);

    var query = querySet.selectBoardInfo;
    console.log(query);
    const result = await dbReq.query(query);
    
    console.log(result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.post('/proc-board', async (req, res) => {
  console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('idx', mssql.Int, req.body.idx);
		dbReq.input('boardNo', mssql.Int, req.body.boardNo);
    dbReq.input('openTeam', mssql.VarChar, req.body.openTeam);
    dbReq.input('title', mssql.NVarChar, req.body.title);
    dbReq.input('contents', mssql.NVarChar, req.body.contents);
    dbReq.input('fileYn', mssql.Char, req.body.fileYn);
    dbReq.input('replyYn', mssql.Char, req.body.replyYn);
    dbReq.input('regId', mssql.VarChar, req.body.regId);
    dbReq.input('regNm', mssql.NVarChar, req.body.regNm);
    dbReq.input('outIdx', '');
		//dbReq.output();
		dbReq.execute('put_board_main').then(result => {
      console.log(result);
      result.recordset[0].isSuccess = true;
			res.json(result.recordset);
		}).catch(err => {
      var obj = new Object();
      obj.recordset = new Object();
      obj.recordset.isSuccess = false;
      obj.recordset.message = err.message;
      res.json(obj);
    });
		
	} catch (err) {
		res.status(500);
		res.send(err.message);
	}
});

router.post('/proc-reply', async (req, res) => {
  console.log(req.body);
	try {
		const conn = await pool;
		const dbReq = conn.request();
		dbReq.input('idx', Number(req.body.idx));
    dbReq.input('refIdx', Number(req.body.refIdx));
    dbReq.input('appendIdx', Number(req.body.appendIdx));
    dbReq.input('depth', Number(req.body.depth));
    dbReq.input('contents', String(req.body.contents));
    dbReq.input('regId', String(req.body.regId));
    dbReq.input('regNm', String(req.body.regNm));
		//dbReq.output();
		dbReq.execute('put_board_reply').then(result => {
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