import { recommendationSchema } from '../validations/recommendationsValidate.js';
import * as recommendationService from '../services/recommendationsService.js';
import BodyError from '../errors/BodyRecommendationError.js';
import NotFoundError from '../errors/CanNotFind.js';

async function postRecommendation(req, res) {
    const {
        name,
        youtubeLink,
    } = req.body;

    const validate = recommendationSchema.validate({
        name,
        youtubeLink,
    });

    if (validate.error) {
        throw new BodyError(validate.error.message);
    }

    try {
        const recommendation = await recommendationService.postRecommendation({
            name,
            youtubeLink,
        });
        return res.send(recommendation);
    } catch (error) {
        if (error instanceof BodyError) {
            return res.status(400).send(error.message);
        }
        return res.sendStatus(500);
    }
}

async function postUpvote(req, res) {
    const { id } = req.params;

    const type = 'up';

    try {
        const up = await recommendationService.vote({ id, type });

        return res.status(200).send(up);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
        return res.sendStatus(500);
    }
}

async function postDownvote(req, res) {
    const { id } = req.params;

    const type = 'down';

    try {
        const down = await recommendationService.vote({ id, type });

        return res.status(200).send(down);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
        return res.sendStatus(500);
    }
}

export {
    postRecommendation,
    postUpvote,
    postDownvote,
};
