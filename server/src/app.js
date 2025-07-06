const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRouter = require('./routes/authRouter');
const specialistRouter = require('./routes/specialistRouter');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// чтобы папка uploads раздавалась в статике
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRouter);
// получить все сущности в specialist по userId
app.use('/api/specialist', specialistRouter);

module.exports = app;
