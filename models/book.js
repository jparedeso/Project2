module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
      // Giving the Book model strings
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
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