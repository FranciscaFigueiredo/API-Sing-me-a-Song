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

async function getSongsRandom() {
    const findPopularSongs = await recommendationRepository.getPopularSongs();
    const findUnpopularSongs = await recommendationRepository.getUnpopularSongs();
    const randomRecommendations = [];

    if (!findPopularSongs.length && !findUnpopularSongs.length) {
        throw new NotFoundError('Could not find songs');
    }

    if (!findPopularSongs.length) {
        return findUnpopularSongs;
    }

    if (!findUnpopularSongs.length) {
        return findPopularSongs;
    }

    const lengthTotal = findPopularSongs.length + findUnpopularSongs.length;
    let random = 0;
    let index = 0;
    for (let i = 0; i < lengthTotal; i++) {
        random = Math.floor((Math.random() * 10) + 1);
        if (random > 3 && findPopularSongs.length) {
            index = Math.floor((Math.random() * (findPopularSongs.length - 1)));
            randomRecommendations.push(findPopularSongs[index]);
            findPopularSongs.splice(index, 1);
        }
        if (random <= 3 && findUnpopularSongs.length) {
            index = Math.floor((Math.random() * (findUnpopularSongs.length - 1)));
            randomRecommendations.push(findUnpopularSongs[index]);
            findUnpopularSongs.splice(index, 1);
        }
    }

    return randomRecommendations;
}

export {
    postRecommendation,
    vote,
    getSongs,
    getSongsRandom,
};
