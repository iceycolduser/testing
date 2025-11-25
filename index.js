import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";
import chalk from 'chalk';
import packageJson from './package.json' with { type: 'json' };

const __dirname = path.resolve();
const server = http.createServer();
const bareServer = createBareServer('/seal/');
const app = express(server);
const version = packageJson.version;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

app.use((req, res) => {
  res.statusCode = 404;
  res.sendFile(path.join(__dirname, './static/404.html'));
});

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else if (req.url.endsWith("/wisp/") || req.url.endsWith("/wisp")) {
    wisp(req, socket, head);
  } else {
    socket.end();
  }
});

server.on('listening', () => {
  console.log(chalk.bgBlue.white.bold`  Arctic 1.0 with WebSocket Support  ` + '\n');
  console.log(chalk.cyan('-----------------------------------------------'));
  console.log(chalk.green('  🌟 Status: ') + chalk.bold('Active'));
  console.log(chalk.green('  🌍 Port: ') + chalk.bold(chalk.yellow(server.address().port)));
  console.log(chalk.magenta('📦 Version: ') + chalk.bold(version));
  console.log(chalk.cyan('-----------------------------------------------'));
});

server.listen({ port: 8001 });
