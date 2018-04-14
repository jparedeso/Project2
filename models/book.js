module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
        isbn: {
            type: DataTypes.STRING(30),
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len     : [3, 30]
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len     : [3, 30]
            }
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                len     : [4]
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len     : [3, 20]
            }
            // value: ("Arts", "Biography", "Children's Books", "Comics & Graphic Novels", "Computers & Technology", "Cookbooks", "Education", "Health", "History", "Horror", "Literature", "Mystery, Thriller & Suspense", "Philosophy", "Poetry", "Politics", "Religion", "Science Fiction & Fantasy", "Travel", "True Crime", "Other")
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
  
    // will use associate to join Book with other tables

    Book.associate = function(models) {
        Book.hasMany(models.UserBook, {
            onDelete: "cascade"
        });
    };

    return Book;
};