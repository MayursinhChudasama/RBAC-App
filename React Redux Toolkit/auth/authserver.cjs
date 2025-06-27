// const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("./auth/auth.json");
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
server.use(auth); // 👈 this must come before router
server.use(router);

server.listen(3001, () => {
  console.log("✅ Auth server running at http://localhost:3001");
});
