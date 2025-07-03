const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRouter = require('./routes/authRouter');
const specialistsRouter = require('./routes/specialistsRouter');
const servicesRouter = require('./routes/servicesRouter');
const reviewsRouter = require('./routes/reviewsRouter');
const calendarRouter = require('./routes/calendarRouter');
const requestsRouter = require('./routes/requestsRouter');
const specialistServiceRouter = require('./routes/specialistServiceRouter');
const usersRouter = require('./routes/usersRouter');
const profileRouter = require('./routes/profileRouter');
const clientRequestsRouter = require('./routes/clientRequestsRouter');
const clientSettingsRouter = require('./routes/clientSettingsRouter');
const specialistRequestsRouter = require('./routes/specialistRequestsRouter');
const specialistCalendarRouter = require('./routes/specialistCalendarRouter');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/specialists', specialistsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/requests', requestsRouter);
app.use('/api/specialist-services', specialistServiceRouter);
app.use('/api/users', usersRouter);
app.use('/api/profile', profileRouter);
app.use('/api/client/requests', clientRequestsRouter);
app.use('/api/client/settings', clientSettingsRouter);
app.use('/api/specialist/requests', specialistRequestsRouter);
app.use('/api/specialist/calendar', specialistCalendarRouter);

module.exports = app;
