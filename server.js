const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
// const multiparty = require('multiparty');
const formidable = require('formidable');
require('colors');

const PORT = 8080;

const app = express();
app.listen(PORT, function() {
  let host = this.address().address;
  host = host === '::' ? 'localhost' : host;
  const port = this.address().port;
  console.log(`Server listen on http://${host}:${port}`.blue);
});

app.use(bodyParser.json());
app.use(express.static('assets'));

app.get('/', (req, res) => res.status(200).sendFile('assets/index.html'));
app.post('/user-form', (req, res) => {
  // const form = new multiparty.Form();
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) throw err;
    console.log(fields);
    res.status(202).end(JSON.stringify(fields));
  });
});
