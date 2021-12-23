import { Router } from 'express';

import * as recommendationController from '../controllers/recommendationController.js';

const router = new Router();

router.post('', recommendationController.postRecommendation);
router.post('/:id/upvote', recommendationController.postUpvote);
router.post('/:id/downvote', recommendationController.postDownvote);
router.get('/top/:amount', recommendationController.getTopSongs);
router.get('/random', recommendationController.getRandomSongs);

export default router;
