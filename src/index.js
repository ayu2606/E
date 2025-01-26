require('./routes/router.js')
require('./utils/modules.js')

app.listen('2000', () => {
  console.log(`Server is running on http://localhost:2000`);
});
