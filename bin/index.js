const app = require("../src/app.js");
const http = require("http");

const port = process.env.PORT || "8090"
app.set("port", port);

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

server.on("listening", () => {
  console.log("listen on port", process.env.PORT)
});
