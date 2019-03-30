var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.post("/api/Login", function(req, res) {
    db.Login.findOne({
      where: {
        userName: req.body.userName,
        password: req.body.password
      }
    }).then(function(result) {
      if (result.length === 0) {
        return res.json({ login: false });
      } else {
        return res.json({
          login: true,
          userId: result.id,
          userName: result.userName,
          status: result.status
        });
      }
    });
  });

  // Create a new example
  app.post("/api/Login/create", function(req, res) {
    db.Login.create({
      userName: req.body.userName,
      password: req.body.password,
      status: req.body.status
    }).then(function(dbLogin) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbLogin);
    });
  });

  app.get("/api/Employee/:id", function(req, res) {
    db.Employee.findOne({
      where: {
        id: req.parms.id
      }
    }).then(function(result) {
      res.json({
        userName: result.userName,
        jobTitle: result.jobTitle,
        contactInfo: result.contactInfo,
        bio: result.bio
      });
    });
  });

  app.get("/api/Skills/:idEmployee", function(req, res) {
    db.Rtable.findAll({
      where: {
        id: req.parms.idEmployee
      }
    }).then(function(result) {
      res.json(result);
    });
  });
  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });
};
