module.exports = async function () {
  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', async (ws, req) => {
    const { authorization: m } = req.headers;
    if (!m || m !== process.env.API_KEY) {
      ws.send(JSON.stringify({ error: 'Unauthorized' }));
      ws.close(1008, 'Unauthorized');
      return;
    }

    const serverId = req.params.serverId;
    const user = req.session.user;
    const nodes = await db.get('nodes');
    const servers = await db.get('servers') || {};

    const a = nodes[serverId];

    const ws = new WebSocket(`ws://${a.url}/containers/${serverId}/logs`, { headers: { 'authorization': process.env.API_KEY } });

    ws.on('open', () => ws.send(JSON.stringify({ action: 'start' })));
    ws.on('message', (data) => ws.send(data));
    ws.on('close', () => ws.close());
    ws.on('error', (err) => {
      ws.send(JSON.stringify({ error: err.message }));
      ws.close(1011, 'Internal Server Error');
    });

    ws.on('close', () => ws.close());
    ws.on('error', () => ws.close());

    ws.on('message', async (message) => {
      let a;
      try {
        a = JSON.parse(message);
      } catch (error) {
        ws.send(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }

      switch (a.event) {
        case 'cmd':
          sendCommand(ws, serverId, a.command);
          break;
        default:
          ws.send(JSON.stringify({ error: 'Event 404' }));
          break;
      }
    });
  });

  function sendCommand(ws, serverId, command) {
    const cmd = command.split(' ');
    ws.send(JSON.stringify({ action: 'exec', cmd, serverId }));
  }

  app.ws('/ws/:serverId', (ws, req) => {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
      wss.emit('connection', ws, req);
    });
  });
};
