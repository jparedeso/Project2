module.exports = function(sequelize, DataTypes) {
    var Exchange = sequelize.define("Exchange", {
      // Giving the Exchange model strings
      title: DataTypes.STRING

    });
  
    // will use associate to join Exchange with other tables

    // Exchange.associate = function(models) {
    //   Exchange.hasMany(models."other table here", {
    //     onDelete: "cascade"
    //   });
    // };
  
    return Exchange;
  };