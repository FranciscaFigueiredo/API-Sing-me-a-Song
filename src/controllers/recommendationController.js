import * as recommendationService from '../services/recommendationsService.js';
import BodyError from '../errors/BodyRecommendationError.js';
import NotFoundError from '../errors/CanNotFind.js';

async function postRecommendation(req, res, next) {
    const {
        name,
        youtubeLink,
    } = req.body;

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
        return next();
    }
}

async function postUpvote(req, res, next) {
    const { id } = req.params;

    const type = 'up';

    try {
        const up = await recommendationService.vote({ id, type });

        return res.status(200).send(up);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
        return next();
    }
}

async function postDownvote(req, res, next) {
    const { id } = req.params;

    const type = 'down';

    try {
        const down = await recommendationService.vote({ id, type });

        return res.status(200).send(down);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
        return next();
    }
}

async function getTopSongs(req, res, next) {
    const { amount } = req.params;

    try {
        const songs = await recommendationService.getSongs({ amount });

        return res.status(200).send(songs);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
        return next();
    }
}

async function getRandomSongs(req, res, next) {
    try {
        const song = await recommendationService.getSongsRandom();

        return res.status(200).send(song);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
        return next();
    }
}

export {
    postRecommendation,
    postUpvote,
    postDownvote,
    getTopSongs,
    getRandomSongs,
};
