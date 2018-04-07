module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
      // Giving the Book model strings
        // user_id to be stored to link book to user, this is not a primary key id. A primary id column will automatically be generated.
        // not sure if it works

        // user_id: {
        //     type: Sequelize.INTEGER,
        // },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER[4],
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM,
            values: ["Arts", "Biography", "Children's Books", "Comics & Graphic Novels", "Computers & Technology", "Cookbooks", "Education", "Health", "History", "Horror", "Literature", "Mystery, Thriller & Suspense", "Philosophy", "Poetry", "Politics", "Religion", "Science Fiction & Fantasy", "Travel", "Other"]
        },
        checkedOut: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

    });
  
    // will use associate to join Book with other tables

    // Book.associate = function(models) {
    //     Book.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
  
    return Book;
};