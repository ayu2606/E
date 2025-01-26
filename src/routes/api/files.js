module.exports = async function () {
  app.post("/api/servers/files/create", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const servers = await db.get("servers");
      const nodes = await db.get("nodes");

      if (!servers || !servers[serverId]) {
        return res.status(404).send({ error: "Server not found" });
      }

      const server = servers[serverId];
      const a = nodes[server.a];

      const response = await fetch(`${a.url}/servers/files`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          body: JSON.stringify({
            serverId: req.body.serverId,
            path: req.body.path,
            content: req.body.content || "",
            type: req.body.type === "folder" ? true : false,
          }),
        },
      });

      res.send({ message: "Done" });
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  app.delete("/api/servers/files", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const servers = await db.get("servers");
      const nodes = await db.get("nodes");

      if (!servers || !servers[serverId]) {
        return res.status(404).send({ error: "Server not found" });
      }

      const server = servers[serverId];
      const a = nodes[server.a];

      const response = await fetch(`${a.url}/servers/files`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          body: JSON.stringify({
            serverId: req.body.serverId,
            path: req.body.path,
          }),
        },
      });

      res.send({ message: "Done" });
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  app.post("/api/servers/files", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const servers = await db.get("servers");
      const nodes = await db.get("nodes");

      if (!servers || !servers[serverId]) {
        return res.status(404).send({ error: "Server not found" });
      }

      const server = servers[serverId];
      const a = nodes[server.a];

      const response = await fetch(`${a.url}/servers/files`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          body: JSON.stringify({
            serverId: req.body.serverId,
            path: req.body.path,
            content: req.body.content || "",
          }),
        },
      });

      res.send({ message: response.json() });
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  app.post("/api/servers/files/rename", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const servers = await db.get("servers");
      const nodes = await db.get("nodes");

      if (!servers || !servers[serverId]) {
        return res.status(404).send({ error: "Server not found" });
      }

      const server = servers[serverId];
      const a = nodes[server.a];

      const response = await fetch(`${a.url}/servers/files/rename`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          body: JSON.stringify({
            serverId: req.body.serverId,
            ex: req.body.path,
            sec: req.body.content || "",
          }),
        },
      });

      res.send({ message: "Done" });
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  app.post("/api/servers/files/edit", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const servers = await db.get("servers");
      const nodes = await db.get("nodes");

      if (!servers || !servers[serverId]) {
        return res.status(404).send({ error: "Server not found" });
      }

      const server = servers[serverId];
      const a = nodes[server.a];

      const response = await fetch(`${a.url}/servers/files/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          body: JSON.stringify({
            serverId: req.body.serverId,
            path: req.body.path,
            content: req.body.content || "",
          }),
        },
      });

      res.send({ message: "Done" });
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
};
