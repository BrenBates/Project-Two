module.exports = function(sequelize, DataTypes) {
    var Watchrules = sequelize.define("Watchrules", {
      rule: DataTypes.TEXT,
      film: DataTypes.STRING,
      episode: DataTypes.STRING
    });
    return Watchrules;
  };