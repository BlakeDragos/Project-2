/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "login",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        field: "id"
      },
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        field: "UserName"
      },
      password: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "Password"
      },
      status: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: "0",
        field: "Status"
      }
    },
    {
      tableName: "login"
    }
  );
};
