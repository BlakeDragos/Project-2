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
  app.get("/api/Login", function(req, res) {
    db.Login.findAll({}).then(function(result) {
      res.json(result);
    });
  });
  app.get("/api/Skills", function(req, res) {
    db.Skills.findAll({}).then(function(result) {
      res.json(result);
    });
  });
  app.get("/api/Jobs", function(req, res) {
    db.Jobs.findAll({}).then(function(result) {
      res.json(result);
    });
  });
  app.get("/api/Jobs/:jobTitle", function(req, res) {
    db.Employee.findAll({
      where: {
      jobTitle: req.params.jobTitle
    }}).then(function(result) {
      res.json(result);
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
  app.post("/api/Employee", function(req, res) {
    db.Employee.create({
      userName: req.body.userName,
      name: req.body.name,
      jobTitle: req.body.jobTitle,
      contactInfo: req.body.contactInfo,
      bio: req.body.bio
    }).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });
  app.put("/api/Employee/:userName", function (req, res) {
    db.Employee.update(
      {
        name: req.body.name,
        jobTitle: req.body.jobTitle,
        contactInfo: req.body.contactInfo,
        bio: req.body.bio},
      {where: { userName: req.params.userName
      }})
    .then(function(result) {
      res.json({
        userName: result.userName,
        name: result.name,
        jobTitle: result.jobTitle,
        contactInfo: result.contactInfo,
        bio: result.bio
      })
    });
  });

  app.get("/api/Employee/:userName", function(req, res) {
    db.Employee.findOne({
      where: {
        userName: req.params.userName
      }
    }).then(function(result) {
      res.json({
        userName: result.userName,
        name: result.name,
        jobTitle: result.jobTitle,
        contactInfo: result.contactInfo,
        bio: result.bio
      });
    });
  });

  app.post("/api/Skills", function(req, res) {
    db.Skills.create({
      skill: req.body.skill
    }).then(function(dbSkill) {
      res.json(dbSkill);
    });
  });
  app.post("/api/Jobs", function(req, res) {
    db.Jobs.create({
      jobTitle: req.body.jobTitle
    }).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });

  app.post("/api/Rtable", function(req, res) {
    db.Rtable.create({
      idEmployee: req.body.idEmployee,
      idSkills: req.body.idSkills
    }).then(function(dbRtable) {
      res.json(dbRtable);
    });
  });

  app.post("/api/query", function(req, res) {
    var array;
    array = req.body.skillIds;
    db.Employee.findAll({
      include: [
        {
          model: db.Skills,
          attributes: ["skill"],
          // eslint-disable-next-line camelcase
          through: { where: { id: array } }
        }
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/Rtable/:idEmployee", function(req, res) {
    console.log(req.params.idEmployee);
    db.Rtable.findAll({
      where: {
        id: req.params.idEmployee
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
