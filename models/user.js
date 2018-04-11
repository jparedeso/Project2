const bcrypt = require("bcrypt-nodejs");
module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
      // Giving the User model name strings
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
                // len
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //gonna get rid of this one
        userPassword: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
  
    // will use associate to join user with other tables

    User.associate = function(models) {
        User.hasMany(models.Book, {
            onDelete: "cascade"
        });
        User.belongsTo(models.Group, {
            foreignKey: {
                allowNull: false
            }
        });
    };
  
    return User;
};