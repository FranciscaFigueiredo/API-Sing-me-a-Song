import { Router } from 'express';

import * as recommendationController from '../controllers/recommendationController.js';

const router = new Router();

router.post('', recommendationController.postRecommendation);
router.put('/:id/upvote', recommendationController.postUpvote);
router.put('/:id/downvote', recommendationController.postDownvote);

export default router;
