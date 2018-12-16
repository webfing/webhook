const http = require('http');
const createHandler = require('github-webhook-handler');
const deployHanlder = require('./services/deploy');
const { argv } = require('yargs');
const { PORT, SECRET } = argv;

console.log(PORT, SECRET);

// webhook config
const handler = createHandler({
  path: '/webhook',
  secret: SECRET,
});

// server
http.createServer((req, res) => {
  handler(req, res, (err) => {
    res.statusCode = 200;
    res.end('no such page');
  });
}).listen(PORT || 7070, () => {
  console.log(`Deply server Run! port at ${PORT}`, Date.now());
});

// handler
handler.on('error', err => console.error('Sre Error', err.message, Date.now()));
handler.on('push', event => deployHanlder(event));

