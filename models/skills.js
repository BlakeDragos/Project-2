/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  var Skills = sequelize.define(
    "Skills",
    {
      // id: {
      //   type: DataTypes.INTEGER(11),
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   field: "id"
      // },
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
    Skills.belongsToMany(models.Employee, {
      through: models.Rtable,
      foreignKey: "idSkills"
    });
  };
  return Skills;
};
