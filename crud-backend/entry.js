// importing modules

var express = require('express')
var mysql = require('mysql')
var bodyparser = require('body-parser')
var cors = require('cors')

var app = express()

const route = require('./route/routes')

// var connection = mysql.createConnection({
//	host	: 'localhost',
//	user	: 'vmail',
//	password: '',
//	database: 'vmail'
// });

// connection.connect(function(err){
//	if (err) {
//		console.error('error connecting: ' + err.stack);
//		return;
//	}

//	console.log('connected to db vmail as id: ' + connection.threadId);

// });

// connection.query('', function (err, rows, fields) {
//	if (err) throw err;
//
//	console.log('', rows[0].columnName);
// })

// connection.end();

const PORT = 5555

// adding middleware - cors, body-parser
app.use(cors())
app.use(bodyparser.json())

app.use('/api', route)

app.get('/', function (req, res) {
  res.send('Hallo Node Server!')
})

app.listen(PORT, function () {
  console.log('Server has been started at port: ' + PORT)
})
