module.exports = async function () {
  app.post('/api/nodes/add', async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      const { name, nodeLocation, nodeRAM, ramOverAllocation, nodeDisk, diskOverAllocation, isPrivate, nodeUrl } = req.body;

      const nodes = (await db.get('nodes')) || [];
      nodes.push({
        name,
        nodeLocation,
        nodeRAM,
        ramOverAllocation,
        nodeDisk,
        diskOverAllocation,
        isPrivate,
        nodeUrl
      });
      await db.set('nodes', nodes);

      console.log('Added node:', name);

      res.send({ message: 'Node impregnated with panel successfully' });
    } catch (err) {
      console.error('Error adding node:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  app.post('/api/nodes/remove', async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      const { name } = req.body;

      const nodes = (await db.get('nodes')) || [];
      const a = nodes.filter(node => node.name !== name);
      await db.set('nodes', a);

      console.log('Removed node:', name);

      res.send({ message: 'Node fucked successfully' });
    } catch (err) {
      console.error('Error fucking node:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
};
