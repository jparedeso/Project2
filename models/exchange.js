module.exports = function(sequelize, DataTypes) {
    var Exchange = sequelize.define("Exchange", {
      // Giving the Exchange model strings

    //   status: DataTypes.STRING
      
        // made boolean for true false if it has been exchanged
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
            // value: ("pending", "complete")
        }


        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // // store name of user
        // user_userName: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // book_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // location_place: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }

    });
  
    // will use associate to join Exchange with other tables

    // Exchange.associate = function(models) {
    //   Exchange.hasMany(models.Location, {
    //     onDelete: "cascade"
    //   });
    // };
  
    return Exchange;
};