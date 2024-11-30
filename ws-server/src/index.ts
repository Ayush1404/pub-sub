import { WebSocket } from 'ws'
import http from 'http'
import { v4 as uuidv4 } from 'uuid';
import { UserManager } from './managers/UserManager';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running.');
});

const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;
const userManager = new UserManager()

wss.on('connection', (ws) => {
  const id = uuidv4();
  userManager.onConnect(ws,id)

  console.log('A new client has connected.');

  ws.on('message',(d)=>{
    const event = JSON.parse(d.toString())
    if(event.eventType == 'subscribe'){
      userManager.onSubscribe(id,event.data.stock)
    }
    if(event.eventType == 'unSubscribe'){
      userManager.onUnSubscribe(id,event.data.stock)
    }
  })

  ws.on('close', () => {
    userManager.onDisconnect(id);
    console.log('A client has disconnected.');
  });
});


server.listen(PORT, () => {
  console.log(`WebSocket server is listening on port ${PORT}`);
});