import dotenv from 'dotenv';
dotenv.config();

const config = {
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD|| 'root',
    host: process.env.DB_HOST|| 'localhost',
    database: process.env.DB_DATABASE || 'AssignmentCSDL',
    port: process.env.PORT || 3000,
    db_port: process.env.DB_PORT || 3306,
};

export default config;