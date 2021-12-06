import BodyError from '../src/errors/BodyRecommendationError.js';
import NotFoundError from '../src/errors/CanNotFind.js';
import * as recommendationService from '../src/services/recommendationsService.js';
import * as recommendationRepository from '../src/repositories/recommendationRepository.js';

const sut = recommendationService;

describe('Not Found recommendation', () => {
    it('should returns instance of NotFoundError', async () => {
        const result = sut.vote({ id: -10, type: 'up' });
        await expect(result).rejects.toThrowError(NotFoundError);
    });

    it('should returns instance of NotFoundError', async () => {
        const result = sut.vote({ id: -10, type: 'down' });
        await expect(result).rejects.toThrowError(NotFoundError);
    });
});

describe('Vote for the recommendation', () => {
    const song = {
        id: 1,
        name: 'name',
        youtubeLink: 'youtubeLink',
        score: 2,
    };

    it('should returns score - 1 for downvote', async () => {
        const downvote = {
            ...song,
            score: song.score - 1,
        };

        jest.spyOn(recommendationRepository, 'findById')
            .mockImplementationOnce(() => ({
                id: 1,
                name: 'name',
                youtubeLink: 'youtubeLink',
                score: 2,
            }));
        jest.spyOn(recommendationRepository, 'putScore')
            .mockImplementationOnce(() => (downvote));
        const result = sut.vote({ id: 1, type: 'down' });
        await expect(result).toEqual;
    });
});

describe('POST recommendation', () => {
    it('should returns instance of NotFoundError', async () => {
        const song = sut.postRecommendation({ name: 'name', youtubeLink: 'youtubeLink' });
        await expect(song).rejects.toThrowError(BodyError);
    });

    it('should returns instance of NotFoundError', async () => {
        const song = sut.vote({ id: -10, type: 'down' });
        await expect(song).rejects.toThrowError(NotFoundError);
    });
});

describe('GET recommendations', () => {
    it('should returns instance of NotFoundError', async () => {
        const song = sut.getSongs({ amount: 5 });
        await expect(song).rejects.toThrowError(NotFoundError);
    });

    it('should returns instance of NotFoundError', async () => {
        const song = sut.getSongsRandom();
        await expect(song).rejects.toThrowError(NotFoundError);
    });
});
