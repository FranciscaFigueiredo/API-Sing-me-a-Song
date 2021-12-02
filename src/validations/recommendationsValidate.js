import joi from 'joi';

const regexHttp = /(http(s)?:\/\/.)?(www\.)?(youtube\.)?(com\/watch)([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

const recommendationSchema = joi.object({
    name: joi.string().min(3).max(60).required(),
    youtubeLink: joi.string().pattern(regexHttp).required(),
});

export {
    recommendationSchema,
};
