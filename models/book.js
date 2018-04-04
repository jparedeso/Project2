module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
      // Giving the Book model strings
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      year: DataTypes.INTEGER,
      category: DataTypes.STRING,
      checkedOut: DataTypes.BOOLEAN

    });
  
    // will use associate to join Book with other tables

    // Book.associate = function(models) {
    //   Book.hasMany(models."other table here", {
    //     onDelete: "cascade"
    //   });
    // };
  
    return Book;
  };