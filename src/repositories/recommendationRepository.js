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

async function findById({ id }) {
    try {
        const song = await connection.query(`
            SELECT * FROM songs
            WHERE id = $1;
        `, [id]);

        return song.rows;
    } catch (error) {
        return false;
    }
}

async function putScore({ id, type }) {
    let operator = '+';
    if (type === 'down') {
        operator = '-';
    }

    try {
        const song = await connection.query(`
                UPDATE songs 
                SET score = score ${operator} 1
                WHERE id = $1
                RETURNING *;
            `, [id]);

        return song.rows;
    } catch (error) {
        return false;
    }
}

async function deleteRecommend({ id }) {
    try {
        await connection.query(`
            DELETE FROM songs
            WHERE id = $1
        `, [id]);

        return true;
    } catch (error) {
        return false;
    }
}

async function getTopSongs({ amount }) {
    let query = 'SELECT * FROM songs ORDER BY score DESC ';

    if (amount) {
        query += `LIMIT ${amount}`;
    }

    try {
        const topSongs = await connection.query(`${query};`);

        return topSongs.rows;
    } catch (error) {
        return false;
    }
}

async function getPopularSongs() {
    try {
        const popularSongs = await connection.query('SELECT * FROM songs WHERE score > 10;');

        return popularSongs.rows;
    } catch (error) {
        return [];
    }
}

async function getUnpopularSongs() {
    try {
        const unpopularSongs = await connection.query('SELECT * FROM songs WHERE score < 11;');

        return unpopularSongs.rows;
    } catch (error) {
        return [];
    }
}

export {
    create,
    putScore,
    deleteRecommend,
    findById,
    getTopSongs,
    getPopularSongs,
    getUnpopularSongs,
};
