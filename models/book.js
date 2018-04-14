module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
      // Giving the Book model strings
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3,30]
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3,30]
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [4],
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3,20]
            // value: ("Arts", "Biography", "Children's Books", "Comics & Graphic Novels", "Computers & Technology", "Cookbooks", "Education", "Health", "History", "Horror", "Literature", "Mystery, Thriller & Suspense", "Philosophy", "Poetry", "Politics", "Religion", "Science Fiction & Fantasy", "Travel", "True Crime", "Other")
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
  
    // will use associate to join Book with other tables

    Book.associate = function(models) {
        Book.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Book;
};