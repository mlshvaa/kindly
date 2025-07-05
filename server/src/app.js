const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRouter = require('./routes/authRouter');
const calendarsRouter = require('./routes/calendarsRouter');
const servicesRouter = require('./routes/servicesRouter');
const servicesSpecialistsRouter = require('./routes/servicesSpecialistsRouter');
const reviewsRouter = require('./routes/reviewsRouter');
const requestsRouter = require('./routes/requestsRouter');
const parentsRouter = require('./routes/parentsRouter');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/api/calendars', calendarsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/services-specialists', servicesSpecialistsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/requests', requestsRouter);
app.use('/api/parents', parentsRouter);

module.exports = app;
