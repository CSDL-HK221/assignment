import dotenv from 'dotenv';
dotenv.config();

const config = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'seq_basics',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}