import { recommendationSchema } from '../validations/recommendationsValidate.js';
import * as recommendationService from '../services/recommendationsService.js';
import BodyError from '../errors/BodyRecommendationError.js';

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

export {
    postRecommendation,
};
