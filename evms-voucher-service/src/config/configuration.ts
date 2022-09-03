export default () => ({
  port: process.env.PORT,
  microserviceHost: process.env.MICROSERVICE_TCP_HOST,
  mongoURI: process.env.MONGO_URI,
});
