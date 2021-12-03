import BodyError from '../errors/BodyRecommendationError.js';
import * as recommendationRepository from '../repositories/recommendationsRepository.js';

async function postRecommendation({ name, youtubeLink }) {
    const recommendation = await recommendationRepository.create({ name, youtubeLink });

    if (!recommendation) {
        throw new BodyError('The song has already been registered');
    }

    return recommendation;
}

export {
    postRecommendation,
};
