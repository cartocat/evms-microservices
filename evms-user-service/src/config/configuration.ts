export default () => ({
  port: process.env.PORT,
  auth: {
    secret: process.env.SECRET,
    expireIn: process.env.EXPIREIN,
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    databaseName: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV == 'production' ? false : true,
  },
});
