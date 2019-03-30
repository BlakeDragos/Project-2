//var db = require("../models");
var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/employer", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/employer.html"));
  });
  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/search.html"));
  });
  app.get("/employee", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/employee.html"));
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
