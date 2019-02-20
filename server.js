const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
require('colors');

const PORT = 8080;
const app = express();
app.use(bodyParser.json());

const FILE_PATH = './test.json';

app.get('/get-note', (req, res) => {
  fs.readFile(FILE_PATH, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
    res.status(200).send(data);
  });
});

// Via appendFile
app.post('/update-note-append/:chunk', (req, res) => {
  const chunk = req.params.chunk;
  fs.appendFile(FILE_PATH, chunk, err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
    res.sendStatus(201);   
  });
});

// Via writeFile
app.post('/update-note-write/:chunk', (req, res) => {
  const chunk = {value: req.params.chunk};
  fs.readFile(FILE_PATH, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
    console.log(JSON.parse(data));
    console.log(chunk);
    const updatedFile = Object.assign(JSON.parse(data), chunk);
    console.log(updatedFile);
    fs.writeFile(FILE_PATH, JSON.stringify(updatedFile), err => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      }
      res.sendStatus(201);   
    });
  });
});

app.listen(PORT, () => console.log(`Server listen on http://localhost:${PORT}`.blue));
