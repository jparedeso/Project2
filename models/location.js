module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
      // Giving the Location model strings
        place: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
  
    // will use associate to join Location with other tables

    // Location.associate = function(models) {
    //     Location.belongsTo(models.Exchange, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
  
    return Location;
  };