const config = require('./configuration/config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes/index');
const errorMiddleware = require('./middleware/error.middleware');

const { port, hostname } = config;

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', router);

app.use(errorMiddleware);

app.listen(port, hostname, () => {
    console.log(`Server is running on port http://${hostname}:${port}`);
});
