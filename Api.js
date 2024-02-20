const express = require("express");
const app = express();
const compiler = require("compilex");
const options = { stats: true }; //prints stats on console
compiler.init(options);
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(
  "/node_modules/codemirror",
  express.static(
    "C:/SlashMark/Intermediate/code-editor/node_modules/codemirror"
  )
);
app.get("/", function (req, res) {
  compiler.flush( function () {
    console.log("Flushing the cache...");
  });
  res.sendFile("C:/SlashMark/Intermediate/code-editor/index.html");
});

app.post("/compile", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;
  try {
    if (lang === "Cpp" || lang === "C") {
      if (!input) {
        var envData = { OS: "windows", cmd: "g++", options: {timeout: 10000} }; // (uses g++ command to compile )
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows", cmd: "g++", options: {timeout: 10000} }; // (uses g++ command to compile )
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang === "Java") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang === "Python") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    }
  } catch (e) {
    console.log("Error");
  }
});

app.listen(8123);
console.log("Server running at http://localhost:8123/");
