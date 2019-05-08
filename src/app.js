import createError from 'http-errors';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import routes from './routes';
import * as swaggerDocument from '../swagger.json';

const app = express();

dotenv.config();

app.use(
  session({
    secret: process.env.SECRET_KEY || 'authorshaven',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
  })
);

// swagger route


app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/', routes);
app.use('/swagger-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// api version 1

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err.status
  });
  next();
});

export default app;
