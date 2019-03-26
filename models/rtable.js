/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "rtable",
    {
      idEmployee: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "employee",
          key: "id"
        },
        field: "idEmployee"
      },
      idSkills: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "skills",
          key: "id"
        },
        field: "idSkills"
      }
    },
    {
      tableName: "rtable"
    }
  );
};
