import express from 'express';
import cors from 'cors';
import recommendRouter from './routers/recommendRouter.js';
import serverMiddlewareError from './middlewares/serverMiddlewareError.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recommendations', recommendRouter);

app.use(serverMiddlewareError);

export {
    app,
};
