import { WebSocket } from 'ws'
import http from 'http'

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running.');
});

const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

wss.on('connection', (ws) => {
  console.log('A new client has connected.');

  ws.on('close', () => {
    console.log('A client has disconnected.');
  });
});


server.listen(PORT, () => {
  console.log(`WebSocket server is listening on port ${PORT}`);
});