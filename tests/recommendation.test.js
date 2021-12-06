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
                youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
                score: 2,
            }));
        jest.spyOn(recommendationRepository, 'putScore')
            .mockImplementationOnce(() => (downvote));

        const result = await sut.vote({ id: 1, type: 'down' });
        expect(result).toEqual(downvote);
    });

    it('should returns score + 1 for upvote', async () => {
        const upvote = {
            ...song,
            score: song.score + 1,
        };

        jest.spyOn(recommendationRepository, 'findById')
            .mockImplementationOnce(() => ({
                id: 1,
                name: 'name',
                youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
                score: 2,
            }));
        jest.spyOn(recommendationRepository, 'putScore')
            .mockImplementationOnce(() => (upvote));

        const result = await sut.vote({ id: 1, type: 'up' });
        expect(result).toEqual(upvote);
    });
});

describe('POST recommendation', () => {
    it('should returns instance of NotFoundError', async () => {
        const song = sut.postRecommendation({ name: 'name', youtubeLink: 'youtubeLink' });
        await expect(song).rejects.toThrowError(BodyError);
    });

    it('should returns the body created', async () => {
        jest.spyOn(recommendationRepository, 'create')
            .mockImplementationOnce(() => ({
                name: 'name123',
                youtubeLink: 'https://www.youtube.com/watch?v=chwyjwswJbsssscs1Y',
            }));

        const song = await sut.postRecommendation({ name: 'name123', youtubeLink: 'https://www.youtube.com/watch?v=chwyjwswJbsssscs1Y' });
        await expect(song).toEqual({ name: 'name123', youtubeLink: 'https://www.youtube.com/watch?v=chwyjwswJbsssscs1Y' });
    });
});

describe('GET recommendations', () => {
    it('should returns instance of NotFoundError when there is no music', async () => {
        const song = sut.getSongs({ amount: 5 });
        await expect(song).rejects.toThrowError(NotFoundError);
    });

    it('should returns instance of NotFoundError', async () => {
        jest.spyOn(recommendationRepository, 'create')
            .mockImplementationOnce(() => ({
                id: 1,
                name: 'name',
                youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
                score: 2,
            }));
        const song = sut.getSongsRandom();
        await expect(song).rejects.toThrowError(NotFoundError);
    });
});


describe('FIND recommendation', () => {
    it('should returns right song', async () => {
        jest.spyOn(recommendationRepository, 'create')
            .mockImplementationOnce(() => ({
                id: 1,
                name: 'name',
                youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
                score: 2,
            }));
        const song = recommendationRepository.findById({ id: 2 });
        await expect(song).not.toBe({
            id: 1,
            name: 'name',
            youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
            score: 2,
        });
    });
});
