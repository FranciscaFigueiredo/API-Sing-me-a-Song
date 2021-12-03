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

async function putScore({ id }) {
    try {
        const song = await connection.query(`
            UPDATE songs 
            SET score = score + 1
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return song.rows;
    } catch (error) {
        return false;
    }
}

export {
    create,
    putScore,
};
