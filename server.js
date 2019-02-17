const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
require('colors');

const PORT = 8080;
const app = express();
app.use(bodyParser.json());

let stringifyFile;

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

app.get('/get-note', (req, res) => loadFile(res));

app.post('/update-note/:note', (req, res) => updateFile(req, res));

app.listen(PORT, () => console.log(`Server listen on http://localhost:${PORT}`.blue));
