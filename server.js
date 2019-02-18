const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
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

let stringifyFile;

app.get('/', (req, res) => res.status(200).sendFile('assets/index.html'));
app.get('/user-form', (req, res) => {
  const form = {
    'first-name': req.query['first-name'],
    'last-name': req.query['last-name']
  };
  console.log(req.query);
  res.status(202).end(JSON.stringify(form));
});

app.get('/get-note', (req, res) => loadFile(res));
app.post('/update-note/:note', (req, res) => updateFile(req, res));

function loadFile(res) {
  fs.readFile('./test.json', 'utf8', (err, data) => {
    if (err) throw err;
    stringifyFile = data;
    res.status(200).send(data);
  });
}

function updateFile(req, res) {
  stringifyFile = JSON.stringify(Object.assign(JSON.parse(stringifyFile), {value: req.params.note}));
  fs.writeFile('./test.json', stringifyFile, err => {
    if (err) throw err;
    console.log('File updated.');
    res.status(201).send(stringifyFile);
  });
}

