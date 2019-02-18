const express = require('express');
const bodyParser = require('body-parser');
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

// Test middleware
app.use((req, res, next) => {
  console.log('Middleware test.');
  next();
});

app.get('/', (req, res) => res.status(200).sendFile('assets/index.html'));

app.post('/user-form', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) throw err;
    console.log(fields);
    res.status(202).json(fields);
  });
});

// Store middleware
app.use('/store', (req, res, next) => {
  console.log('Store middleware invoked.'.magenta);
  next();
});

// GET for store endpoint
app.get('/store', (req, res) => {
  res.status(200).type('html').send('<h1>This is store</h1>');
});

app.use((req, res, next) => {
  console.log('Resources not found.'.red);
  res.sendStatus(404);
});
