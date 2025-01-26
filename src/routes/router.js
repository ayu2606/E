require('../utils/modules.js')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const a = path.resolve(__dirname, "../../.env") 

dotenv.config({ path: a });

fs.readdirSync(path.resolve(__dirname, '../../resources/views')).filter(file => file.endsWith('.ejs')).forEach(file => {
  const route = file === 'index.ejs' ? '/' : `/${file.replace('.ejs', '')}`;
  app.get(route, (req, res) => {
    ejs.renderFile(path.join(path.resolve(__dirname, '../../resources/views'), file), {}, (err, str) => {
      if (err) return res.status(500).end('500 Internal Server Error');
      res.status(200).end(str);
    });
  });
});

(async () => {
  async function load(a) {
    const a = fs.readdirSync(g);

    for (const b of a) {
      const c = path.join(g, b);
      const d = fs.statSync(c);
      if (d.isDirectory()) {
        await load(c);
      } else if (b.endsWith('.js')) {
        const e = require(c);
        if (typeof e === 'function') {
          await e();
        }
      }
    }
  }
  await load(__dirname);
})();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('express-session')({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    name: "E"
}));