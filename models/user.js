module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the User model name strings

    //   firstName: DataTypes.STRING,
    //   lastName: DataTypes.STRING,
    //   userName: DataTypes.STRING,
    //   email: DataTypes.STRING,
    //   password: DataTypes.STRING

        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
  
    // will use associate to join user with other tables

    User.associate = function(models) {
        User.hasMany(models.Book, {
            onDelete: "cascade"
        });
    };
  
    return User;
};