module.exports = async function () {
  app.post('/api/softwares/add', async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      const { a } = req.body;

      const b = (await db.get('softwares')) || [];
      b.push(a);
      await db.set('softwares', b);

      console.log('Added new software:', a.name);

      res.send({ message: 'Software pushed successfully' });
    } catch (err) {
      console.error('Error parsing json software:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
};
