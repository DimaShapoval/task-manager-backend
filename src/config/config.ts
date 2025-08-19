export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtKey: process.env.JWT_KEY,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
  }
})