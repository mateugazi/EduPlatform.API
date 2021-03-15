require('dotenv').config();
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import sampleRouter from './routes/sampleRouter';
import projectsRouter from './routes/projectsRouter';

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@eduplatform.woboc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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

app.use('/sample', sampleRouter);
app.use('/projects', projectsRouter);

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
