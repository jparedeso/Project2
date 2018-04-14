module.exports = function(sequelize, DataTypes) {
    var Exchange = sequelize.define("Exchange", {
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
            // value: ("pending", "complete")
        },
        endDate: {
            type: DataTypes.DATE
            // value: ("pending", "complete")
        }
    });
  
    // will use associate to join Exchange with other tables

    Exchange.associate = function(models) {
        Exchange.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Exchange.belongsTo(models.Book, {
            foreignKey: {
                allowNull: false
            }
        });
    };
  
    return Exchange;
};