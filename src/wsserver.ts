import WebSocket, { WebSocketServer } from 'ws';
import { askAI } from './ai';

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', (socket) => {
  console.log('WebSocket client connected');

  socket.on('message', async (data) => {
    const { sender, content } = JSON.parse(data.toString());
    console.log(`Received message from ${sender}: ${content}`);

    const reply = await askAI(content);

    socket.send(JSON.stringify({ sender, reply }));
  });
});
