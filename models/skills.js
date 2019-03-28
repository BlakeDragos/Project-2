/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Skills = sequelize.define(
    "skills",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        field: "id"
      },
      skill: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        field: "Skill"
      }
    },
    {
      tableName: "skills"
    }
  );
  Skills.associate = function(models) {
    Skills.belongsToMany(models.Employee, { through: Rtable });
  };
  return Skills;
};
