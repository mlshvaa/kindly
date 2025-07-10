const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRouter = require('./routes/authRouter');

const specialistRouter = require('./routes/specialistRouter');
const calendarsRouter = require('./routes/calendarsRouter');
const servicesRouter = require('./routes/servicesRouter');
const servicesSpecialistsRouter = require('./routes/servicesSpecialistsRouter');
const reviewsRouter = require('./routes/reviewsRouter');
const requestsRouter = require('./routes/requestsRouter');
const parentsRouter = require('./routes/parentsRouter');
const chatRouter = require('./routes/chatRouter');
const messagesRoutes = require('./routes/messagesRouter');
const cors = require('cors');


const app = express();


// ✅ CORS — вот здесь
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }),
);


app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// чтобы папка uploads раздавалась в статике
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRouter);
// получить все сущности в specialist по userId
app.use('/api/specialist', specialistRouter);

app.use('/api/calendars', calendarsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/services-specialists', servicesSpecialistsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/requests', requestsRouter);
app.use('/api/parents', parentsRouter);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messagesRoutes);

module.exports = app;
