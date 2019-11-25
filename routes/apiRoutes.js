var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

    // Get all watch rules
    app.get("/api/watchrules", function(req, res) {
      db.Watchrules.findAll({}).then(function(dbWatchrule) {
        res.json(dbWatchrule);
      });
    });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Create a new watch rule
  app.post("/api/watchrules", function(req, res) {
    db.Watchrules.create(req.body).then(function(dbWatchrule) {
      res.json(dbWatchrule);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });

  });

    // Delete an example by id
  app.delete("/api/watchrules/:id", function(req, res) {
    db.Watchrules.destroy({ where: { id: req.params.id } }).then(function(dbWatchrule) {
      res.json(dbWatchrule);
    });

  });
};
