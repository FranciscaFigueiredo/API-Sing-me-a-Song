import express from 'express';
import cors from 'cors';
import recommendRouter from './routers/recommendRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recommendations', recommendRouter);

export {
    app,
};
