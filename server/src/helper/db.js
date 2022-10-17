import mysql from 'mysql2';
import config from "../../config/dbConfig.js";

export const pool = mysql.createPool(config);

