import pool from "../index";

//用户类型
interface User {
    id: number;
    username: string;
    email: string;
    winRate: number;
    last_login_time: Date;
    last_login_ip: string;
}


export const queryUsers = async (params: User) => {
    try {
        const result = await pool.execute("SELECT * FROM users WHERE id = ? OR username = ? OR email = ?", [params.id, params.username, params.email]);
        return result;          
    } catch (error) {
        throw error;
    } 
}

export const createtUser = async (params:User) => {
    try {
        const result = await pool.execute("INSERT INTO users (username, email, last_login_time, last_login_ip, winRate) VALUES (?, ?, ?, ?, ?)", [params.username, params.email, params.winRate, params.last_login_time, params.last_login_ip]);
        return result;
    } catch (error) {
        throw error;
    }
}


