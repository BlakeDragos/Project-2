/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Rtable = sequelize.define(
    "Rtable",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
      },
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
      tableName: "rtable",
      classMethods: {
        associate: function(models) {
          Rtable.belongsTo(models.Employee, {
            foreignKey: "id",
            targetKey: "idEmployee"
          });
          Rtable.belongsTo(models.Skills, {
            foreignKey: "id",
            targetKey: "idSkills"
          });
        }
      }
    }
  );

  return Rtable;
};
