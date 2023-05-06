const express = require("express");
const app = express();
app.use(express.json());



// ===== use .env arguments =====
var path = require("path");
const dotenv = require("dotenv");
const yargs = require("yargs");

const argv = yargs.options({
  dotenv: {
    default: ".test.env",
    describe: "Path to environment file",
    type: "string"
  }
}).argv;

console.log(argv.dotenv)

const env_path = path.resolve(__dirname, "../.env", argv.dotenv);
dotenv.config({ path: env_path});
console.log("this is arg", process.env.ENV_NAME);

// ================================





const cors = require("cors")({
  origin: [
    "*"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  //allowedHeaders: ["Content-Type", "Authorization"],
});

app.use(cors);

app.use("/data", require("./routes/data.js"))

module.exports = app