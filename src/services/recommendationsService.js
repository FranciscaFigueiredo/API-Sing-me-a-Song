import BodyError from '../errors/BodyRecommendationError.js';
import NotFoundError from '../errors/CanNotFind.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';
import { recommendationSchema } from '../validations/recommendationsValidate.js';

function validateBody({ name, youtubeLink }) {
    const validate = recommendationSchema.validate({
        name,
        youtubeLink,
    });

    if (validate.error) {
        throw new BodyError(validate.error.message);
    }
}

async function postRecommendation({ name, youtubeLink }) {
    validateBody({ name, youtubeLink });

    const recommendation = await recommendationRepository.create({ name, youtubeLink });

    if (!recommendation) {
        throw new BodyError('The song has already been registered');
    }

    return recommendation;
}

async function vote({ id, type }) {
    const findMusic = await recommendationRepository.findById({ id });

    if (!findMusic) {
        throw new NotFoundError("Couldn't find this song");
    }

    const music = await recommendationRepository.putScore({ id, type });

    return music;
}

async function getSongs({ amount }) {
    const findSongs = await recommendationRepository.getTopSongs({ amount });

    if (!findSongs.length) {
        throw new NotFoundError('Could not find any music');
    }

    return findSongs;
}

function sortByScore(a, b) {
    if (a.vote > b.vote) {
        return 1;
    }
    if (a.vote < b.vote) {
        return -1;
    }
    return 0;
}

async function getSongsRandom() {
    const findPopularSongs = await recommendationRepository.getPopularSongs();
    const findUnpopularSongs = await recommendationRepository.getUnpopularSongs();

    if (!findPopularSongs.length && !findUnpopularSongs.length) {
        throw new NotFoundError('Could not find songs');
    }

    if (!findPopularSongs.length) {
        return findUnpopularSongs;
    }

    if (!findUnpopularSongs.length) {
        return findPopularSongs;
    }

    const random = Math.floor((Math.random() * 10) + 1);

    const randomRecommendations = random > 3 ? findPopularSongs : findUnpopularSongs;

    const randomSong = randomRecommendations.sort(sortByScore)[0];

    return randomSong;
}

export {
    postRecommendation,
    vote,
    getSongs,
    getSongsRandom,
};
