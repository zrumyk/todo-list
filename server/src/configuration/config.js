require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    hostname: process.env.HOSTNAME,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    nodeEnv: process.env.NODE_ENV,
    dbUrl: process.env.DATABASE_URL,
};
