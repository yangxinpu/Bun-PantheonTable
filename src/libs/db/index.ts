import mysql from "mysql2";

const pool = mysql.createPool({
    host: Bun.env.DB_HOST,
    port: Number(Bun.env.DB_PORT),
    user: Bun.env.DB_USER,
    password: Bun.env.DB_PASSWORD,
    database: Bun.env.DB_DATABASE,
});

export default pool;