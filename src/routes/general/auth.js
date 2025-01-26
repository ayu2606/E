module.exports = async function () {
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const users = (await db.get('users')) || {};
      const user = users[email];

      if (!user || !validate(password, user.passwordHash)) {
        return res.status(401).send({ error: 'Invalid email or password' });
      }

      const sessionData = { email: user.email, username: user.username, permissions: 5 };

      req.session.user = sessionData;
      core.setcookies(res, 'user', encrypt.base64_encode(JSON.stringify(sessionData)), { httpOnly: true, secure: true });

      res.send({ message: 'Login successful', user: { email: user.email, username: user.username } });
    } catch (err) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  app.post('/register', async (req, res) => {
    try {
      const { email, password, username } = req.body;
      const users = (await db.get('users')) || {};

      const h = users[email];
      const hash = encrypt.sha256(password);

      if (h) {
        if (h.passwordHash === hash && h.username === username) {
          const sessionData = { email: h.email, username: h.username, permissions: existingUser.permissions || 1 };
          req.session.user = sessionData;
          res.cookie('user', encrypt.base64_encode(JSON.stringify(sessionData)), { httpOnly: true, secure: true });

          return res.send({ message: 'Login successful', user: { email: h.email, username: h.username, permissions: h.permissions || 1 } });
        } else {
          return res.status(400).send({ error: 'User already exists with different details' });
        }
      }

      users[email] = { email, hash, username, permissions: 5 }; 
      await db.set('users', users);

      const sessionData = { email, username, permissions: 5 };
      req.session.user = sessionData;
      core.setcookies('user', encrypt.base64_encode(JSON.stringify(sessionData)), { httpOnly: true, secure: true });

      res.send({ message: 'Registration successful', user: { email, username, permissions: 5 } });
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  app.get('/logout', (req, res) => {
    try {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).send({ error: 'Failed to logout' });
        }
        core.clearcookies(res, 'user');
        res.send({ message: 'Logout successful' });
      });
    } catch (err) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
};

function validate(a, b) {
  return encrypt.sha256(a) === b;
}
