require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3000,
    hostname: process.env.HOSTNAME || 'localhost',
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    nodeEnv: process.env.NODE_ENV,
    dbUrl: process.env.DATABASE_URL,
}
