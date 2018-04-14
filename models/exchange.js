const moment = require("moment");

module.exports = function(sequelize, DataTypes) {
    var Exchange = sequelize.define("Exchange", {
        startDate: {
            type: DataTypes.DATE,
            defaultValue: moment().format(),
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

        Exchange.belongsTo(models.UserBook, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    // Exchange.sync({
    // 	force: true
    // });
  
    return Exchange;
};