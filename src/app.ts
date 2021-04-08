require('dotenv').config();
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import groupRouter from './routes/groupRouter'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../public/swagger.json'
import swaggerFile from '../swagger_output.json'
import projectsRouter from './routes/projectsRouter';
import tasksRouter from './routes/tasksRouter';
import userRouter from './routes/authorizationRouter';
import announcementRouter from './routes/announcementsRouter';

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@eduplatform.woboc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
  )
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log(err));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/group', groupRouter)
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter)
app.use('/authorization',userRouter);
app.use('/announcements', announcementRouter);

app.use('/', (req: Request, res: Response) => {
  res.status(404).json({
    message: 'The route was not found',
  });
});

app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({
    error: err.message,
  });
});

export default app;