import BodyError from '../errors/BodyRecommendationError.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function postRecommendation({ name, youtubeLink }) {
    const recommendation = await recommendationRepository.create({ name, youtubeLink });

    if (!recommendation) {
        throw new BodyError('The song has already been registered');
    }

    return recommendation;
}

async function upvote({ id }) {
    const score = await recommendationRepository.putScore({ id });

    return score;
}

async function vote({ id, type }) {
    const score = await recommendationRepository.putScore({ id, type });

    return score;
}

export {
    postRecommendation,
    upvote,
    vote,
};
