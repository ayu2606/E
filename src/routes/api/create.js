module.exports = async function () {
  app.post('/servers/start', async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      req.headers['api-key'] === process.env.API_KEY || res.status(apiKey ? 403 : 401).send('Unauthorized');

      const nodes = await db.get('nodes') || [];
      const aaada = nodes.find(n => n.name === node);

      if (!aaada) {
        return res.status(404).send('Node not found');
      }

      const software = await db.get('softwares').find(software => software.name === softwarename);

      if (!software) {
        return res.status(404).send('Software not found');
      }

      const serverId = makeuuid();
      const sftpId = makeuuid();
      const password = makeuuid();

      async function pe() {
        const servers = await db.get('servers') || [];
        let port = node.port;

        while (servers.some(server => server.port === port)) {
          port++;
        }

        return port;
      }

      const port = pe();

      const response = await fetch('${aaada.nodeUrl}/servers/create`;', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          image: software.images[0],
          env: software.config.env_variables.map(variable => `${variable.env_variable}=${variable.default_value}`).join(','),
          ram,
          cpu,
          disk,
          cmd: software.startup, 
          password: password, 
          sftpId: sftpId, 
          port: 25565, 
          serverId: serverId
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create server: ${responseData.message}`);
      }

      const serverDetails = {
        name: serverName,
        sftpId: sftpId,
        port: port,
        ram,
        cpu,
        disk,
        softwareName,
        password: password,
        serverId: serverId
      };

      await db.push('servers', serverDetails);

      res.send('success');
    } catch (err) {
      console.error('Error creating server:', err);
      res.status(500).send('Internal Server Error');
    }
  });
};
function makeuuid() {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let b = '';
  for (let i = 0; i < 16; i++) {
    b += a.charAt(Math.floor(Math.random() * a.length));
  }
  return b;
}
