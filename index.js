const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

var connect = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b6037f17a0d586",
  password: "4a65c704",
  database: "heroku_37bf4a28eb9934b"
});

app.get('/', (req, res) => {
  res.send('hello world!');
  console.log('Running');
});

app.get('/display', (req, res) => {
  var micro_username = req.query.username;

  console.log("username: " + micro_username);

  connect.getConnection(function (err, connection) {
    if (err) { res.send('Error Database Connection'); }
    else {
      var sql = "SELECT * FROM customer";
      connect.query(sql, function (err, result) {
        if (err) { throw err; }
        else {
          res.send(result);
        }
      connection.release();
      });
    }
  });
});


app.listen(process.env.PORT, () => {
  console.log('Example app listening to port 4005');
});
