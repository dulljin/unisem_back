const express = require('express');
const morgan = require('morgan');
const config = require('./config/dbConfig');

var apiBoardRouter = require('./routes/api_board');
var authRouter = require('./routes/auth');
var apiProcRouter = require('./routes/api_proc');
var apiDataRouter = require('./routes/api_data');
var apiCommonRouter = require('./routes/api_common');

const app = express();

//app.use('/config', express.static(__dirname + '/config'));
app.use(express.json());

app.use(morgan('dev'));

app.set('jwt-secret', config.secret);

app.use('/api/board', apiBoardRouter);
app.use('/auth', authRouter);
app.use('/api/proc', apiProcRouter);
app.use('/api/common', apiCommonRouter);
app.use('/api', apiDataRouter);

app.use('/storage', express.static(__dirname + '/storage'));

app.get('/', (req, res) => {
  res.send('Hello express!!');
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Server is working : PORT - ', port);
});

module.exports = app;