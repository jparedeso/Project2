module.exports = function(sequelize, DataTypes) {
    var Group = sequelize.define("Group", {
      // Giving the User model name strings
        groupName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
  
    // will use associate to join group with other tables

    Group.associate = function(models) {
        Group.hasMany(models.User, {
            onDelete: "cascade"
        });
    };
  
    return Group;
};