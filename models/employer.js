/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Employer = sequelize.define(
    "Employer",
    {
      // id: {
      //   type: DataTypes.INTEGER(11),
      //   allowNull: false,
      //   primaryKey: true,
      //   field: "id"
      // },
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "login",
          key: "UserName"
        },
        field: "UserName"
      },
      companyName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "CompanyName"
      },
      contactInfo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "ContactInfo"
      }
    },
    {
      tableName: "employer"
    }
  );
  return Employer;
};
