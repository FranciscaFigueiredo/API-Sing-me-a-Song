import joi from 'joi';

const regexHttp = /((http)+?[s]?:\/\/(www.)*youtube\.com\/watch\?v=([-A-z0-9@:%_+.~#?&\\/\\/=]+)+?)/;

const recommendationSchema = joi.object({
    name: joi.string().min(3).max(60).required(),
    youtubeLink: joi.string().pattern(regexHttp),
});

export {
    recommendationSchema,
};
