const bcrypt = require("bcrypt-nodejs");
module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
      // Giving the User model name strings
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2,20]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2,20]
            }
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
        User.hasMany(models.Exchange, {
            onDelete: "cascade"
        });
        // User.belongsTo(models.Group, {
        //     foreignKey: {
        //         allowNull: false
        //     }
        // });
        User.hasMany(models.UserBook, {
            onDelete: "cascade"
        });
    };
  
    return User;
};