const http = require('http');
const createHandler = require('github-webhook-handler');
const handler = createHandler({
  path: '/webhook',
  secret: 'Oba2634249',
});

// server
http.createServer((req, res) => {
  console.log('runing');
  handler(req, res, (err) => {
    if (err) {
	console.log('king err', err);
    }
    res.statusCode = 200;
    res.end('no such location');
  });
}).listen(7070);

// handler
handler.on('error', (err) => {
  console.error('Error', err.message);
});

handler.on('push', (event) => {
  console.log(event);
  const { payload } = event;
  console.log('Received an issue event for %s action=%s: #%d %s',
    payload.repository.name,
    payload.action);
});

