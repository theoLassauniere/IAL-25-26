import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });

let hr = 70;

function randn(mean=0, sd=1) {
  return mean + sd * Math.sqrt(-2*Math.log(Math.random())) * Math.cos(2*Math.PI*Math.random());
}

function stepHR() {
  hr += randn(0, 0.5);
  hr = Math.max(50, Math.min(180, hr));
}

wss.on('connection', ws => {
  console.log('Client connected to ECG simulator');
  const sendData = () => {
    stepHR();
    const rr = 60000 / hr;
    const msg = {
      type: 'summary',
      ts: Date.now(),
      hr: Math.round(hr),
      rr_ms: Math.round(rr)
    };
    ws.send(JSON.stringify(msg));
  };
  const interval = setInterval(sendData, 1000);
  ws.on('close', () => clearInterval(interval));
});
