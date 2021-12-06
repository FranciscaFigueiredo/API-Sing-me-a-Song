import NotFoundError from '../src/errors/CanNotFind.js';
import * as recommendationService from '../src/services/recommendationsService.js';

describe('Vote for the recommendation', () => {
    it('should returns instance of NotFoundError', async () => {
        const song = recommendationService.vote({ id: -10, type: 'up' });
        await expect(song).rejects.toThrowError(NotFoundError);
    });

    it('should returns instance of NotFoundError', async () => {
        const song = recommendationService.vote({ id: -10, type: 'down' });
        await expect(song).rejects.toThrowError(NotFoundError);
    });
});
