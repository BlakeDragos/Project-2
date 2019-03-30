/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Jobs = sequelize.define(
    "Jobs",
    {
      // id: {
      //   type: DataTypes.INTEGER(11),
      //   allowNull: false,
      //   primaryKey: true,
      //   field: "id"
      // },
      jobTitle: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        field: "JobTitle"
      }
    },
    {
      tableName: "jobs"
    }
  );
  return Jobs;
};
