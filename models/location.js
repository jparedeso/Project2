module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
      // Giving the Location model strings
      place: DataTypes.STRING

    });
  
    // will use associate to join Location with other tables

    // Location.associate = function(models) {
    //   Location.hasMany(models."other table here", {
    //     onDelete: "cascade"
    //   });
    // };
  
    return Location;
  };