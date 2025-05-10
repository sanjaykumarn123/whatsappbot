import { Client, LocalAuth } from 'whatsapp-web.js';
const qrcode = require('qrcode-terminal');
import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:3001');
const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp bot is ready!');
});

client.on('message', async (msg) => {
  const content = msg.body;
  const sender = msg.from;

  console.log(`Got WhatsApp message: ${content}`);

  const payload = JSON.stringify({ sender, content });
  ws.send(payload);
});

ws.on('message', async (data) => {
  const { sender, reply } = JSON.parse(data.toString());
  const chat = await client.getChatById(sender);
  chat.sendMessage(reply);
});

client.initialize();
