module.exports = async function () {
  app.post('/api/servers/start', async (req, res) => {
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

      const f = servers[serverId];
      const a = nodes[f.node];

      const response = await fetch('${a.url}/servers/start`;', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          serverId: req.body.serverId
        }),
      });
      

      res.send({ message: 'Done' });
    } catch (err) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
    });
    app.post('/api/servers/restart', async (req, res) => {
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

      const f = servers[serverId];
      const a = nodes[f.node];

        if (!req.session.user.ownedServers.includes(serverId)) {
          return res.status(403).send({ error: 'Forbidden' });
        }

        const response = await fetch('${a.url}/servers/restart`;', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apikey}`
          },
          body: JSON.stringify({
            serverId: req.body.serverId
          }),
        });


        res.send({ message: 'Done' });
      } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });
    app.post('/api/servers/stop', async (req, res) => {
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

      const f = servers[serverId];
      const a = nodes[f.node];

        const response = await fetch('${a.url}/servers/stop`;', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apikey}`
          },
          body: JSON.stringify({
            serverId: req.body.serverId
          }),
        });


        res.send({ message: 'Done' });
      } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });
};
