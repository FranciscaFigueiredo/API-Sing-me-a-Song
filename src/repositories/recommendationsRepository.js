import { connection } from '../database/database.js';

async function create({ name, youtubeLink }) {
    try {
        const song = await connection.query(`
            INSERT INTO songs 
                (name, youtube_link)
            VALUES
                ($1, $2)
            RETURNING *;
        `, [name, youtubeLink]);

        return song.rows;
    } catch (error) {
        return false;
    }
}

export {
    create,
};
