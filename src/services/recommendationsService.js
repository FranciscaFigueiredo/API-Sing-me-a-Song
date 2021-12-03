import BodyError from '../errors/BodyRecommendationError.js';
import NotFoundError from '../errors/CanNotFind.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function postRecommendation({ name, youtubeLink }) {
    const recommendation = await recommendationRepository.create({ name, youtubeLink });

    if (!recommendation) {
        throw new BodyError('The song has already been registered');
    }

    return recommendation;
}

async function vote({ id, type }) {
    const findMusic = await recommendationRepository.findById({ id });

    if (!findMusic.length) {
        throw new NotFoundError("Couldn't find this song");
    }

    const music = await recommendationRepository.putScore({ id, type });

    if (music[0].score < -5) {
        await recommendationRepository.deleteRecommend({ id });
        return 0;
    }

    return music;
}

async function getSongs({ amount }) {
    const findSongs = await recommendationRepository.getTopSongs({ amount });

    if (!findSongs.length) {
        throw new NotFoundError('Could not find any music');
    }

    return findSongs;
}

export {
    postRecommendation,
    vote,
    getSongs,
};
