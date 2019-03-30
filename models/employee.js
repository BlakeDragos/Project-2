/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define(
    "employee",
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
        references: {
          model: "login",
          key: "UserName"
        },
        field: "UserName"
      },
      jobTitle: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "JobTitle"
      },
      contactInfo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "ContactInfo"
      },
      bio: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "I'M A LOSSER",
        field: "Bio"
      }
    },
    {
      tableName: "employee",
      classMethods: {
        associate: function(models) {
          Employee.hasMany(models.Skills, { through: models.Rtable });
        }
      }
    }
  );
  return Employee;
};
