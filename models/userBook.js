module.exports = function(sequelize, DataTypes) {
    var UserBook = sequelize.define("UserBook", {});

    UserBook.associate = function(models) {
        UserBook.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        UserBook.belongsTo(models.Book, {
            foreignKey: {
                allowNull: false
            }
        });
        UserBook.hasMany(models.Exchange, {
            onDelete: "cascade"
        });
    };
    // UserBook.sync({
    // 	force: true
    // });

    return UserBook;
};