import express from 'express';
import cors from 'cors';
import postRecommend from './routers/recommendRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recommend', postRecommend);

export {
    app,
};
