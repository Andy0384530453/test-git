import http from "http";
import fs from "fs";
import path from "path";

export const startServer = (port = 3000) => {

  const DIST = "./dist";

  const server = http.createServer((req, res) => {

    let file = req.url === "/" ? "/index.html" : req.url;

    const full = path.join(process.cwd(), DIST, file);

    fs.readFile(full, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("404 page not found");
      }

      const ext = path.extname(full);

      res.writeHead(200, {
        "Content-Type": ext === ".html" ? "text/html" : "text/plain"
      });

      res.end(data);
    });

  });

  server.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
  });

};