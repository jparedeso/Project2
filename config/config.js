module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "library_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    host: process.env.RDS_HOST,
    dialect: "mysql"
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    host: process.env.RDS_HOST,
    dialect: "mysql",
      pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
      },
  }
};
