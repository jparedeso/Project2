module.exports = function(sequelize, DataTypes) {
    var UserBook = sequelize.define("UserBook", {});

    // UserBook.sync({
    // 	force: true
    // });

    return UserBook;
};