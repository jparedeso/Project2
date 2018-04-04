module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the User model name strings
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userName: DataTypes.STRING,
      password: DataTypes.STRING
    });
  
    // will use associate to join user with other tables

    // User.associate = function(models) {
    //   User.hasMany(models."other table here", {
    //     onDelete: "cascade"
    //   });
    // };
  
    return User;
  };