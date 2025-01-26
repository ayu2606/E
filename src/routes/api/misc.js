module.exports = async function () {
  app.post('/api/servers/resize', async (req, res) => {
    try {
      const { serverId } = req.body;
      if (!req.session.user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const servers = await db.get('servers');
      const nodes = await db.get('nodes');

      if (!servers || !servers[serverId]) {
        return res.status(404).send({ error: 'Server not found' });
      }

      const server = servers[serverId];
      const a = nodes[server.node];

      const response = await fetch('${a.url}/servers/resize`;', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          body: JSON.stringify({
            serverId: req.body.serverId,
            ram: req.body.ram,
            cpu: req.body.cpu,
            disk: req.body.disk
          }),
        },
      });


      res.send({ message: 'Done' });
    } catch (err) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
    });
  app.post('/api/servers/resources', async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      const { serverId } = req.body;

      const servers = await db.get('servers');
      const nodes = await db.get('nodes');

      if (!servers || !servers[serverId]) {
        return res.status(404).send({ error: 'Server not found' });
      }

      const server = servers[serverId];
      const a = nodes[server.node];

      const response = await fetch('${a.url}/servers/resize`;', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          body: JSON.stringify({
            serverId: req.body.serverId
          }),
        },
      });


      res.send({ message: response.json() });
    } catch (err) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
    });
};
